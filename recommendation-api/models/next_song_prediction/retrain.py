import datetime
import os

import pandas as pd
from tensorflow import keras
from tensorflow import reduce_sum, ragged, function, math, nn, reduce_mean


class MaskedEmbeddingsAggregatorLayer(keras.layers.Layer):
    def __init__(self, agg_mode='sum', **kwargs):
        super(MaskedEmbeddingsAggregatorLayer, self).__init__(**kwargs)

        if agg_mode not in ['sum', 'mean']:
            raise NotImplementedError('mode {} not implemented!'.format(agg_mode))
        self.agg_mode = agg_mode

    @function
    def call(self, inputs, mask=None):
        masked_embeddings = ragged.boolean_mask(inputs, mask)
        if self.agg_mode == 'sum':
            aggregated = reduce_sum(masked_embeddings, axis=1)
        elif self.agg_mode == 'mean':
            aggregated = reduce_mean(masked_embeddings, axis=1)

        return aggregated

    def get_config(self):
        # this is used when loading a saved model that uses a custom layer
        return {'agg_mode': self.agg_mode}


class L2NormLayer(keras.layers.Layer):
    def __init__(self, **kwargs):
        super(L2NormLayer, self).__init__(**kwargs)

    @function
    def call(self, inputs, mask=None):
        if mask is not None:
            inputs = ragged.boolean_mask(inputs, mask).to_tensor()
        return math.l2_normalize(inputs, axis=-1)

    def compute_mask(self, inputs, mask):
        return mask


def ReTrainModel(indexed_songs_file_name, model_snapshot_location):
    """###  Getting Data

    """

    corpus = pd.read_json("http://localhost/api/details/get-indexed-songs")  # "./dataset/indexed-songs.json"

    # indexed_songs_file_name = '../../dataset/indexed-songs/songs.pkl'
    corpus.to_pickle(indexed_songs_file_name)
    print("Saving New Corpus To FileSystem")

    user_watch_history = pd.read_json(
        "http://localhost/api/history/get-history")  # "./dataset/training-get-history.json"
    # user_search_history = pd.read_json("http://localhost:9000/recommendation/history/search")  # "./dataset/training-search.json"

    """## The Model
    - Model Config
    """

    EMBEDDING_DIMS = 16
    DENSE_UNITS = 64
    DROPOUT_PCT = 0.0
    ALPHA = 0.0
    NUM_CLASSES = len(corpus) + 2

    LEARNING_RATE = 0.003

    """### Model Inputs
    Handle Search Queries and Watch History - Encoded Indices of Songs
    """

    search_queries = keras.layers.Input(shape=(None,), name='search_query')
    watch_history = keras.layers.Input(shape=(None,), name='watch_history')

    user_watch_history.head()

    """## Process Data
    - Movie to Id Index
    """

    song_ids = corpus["song_id"].unique().tolist()
    song_2_index = {x: i for i, x in enumerate(song_ids)}
    index_2_songid = {i: x for i, x in enumerate(song_ids)}

    user_ids = user_watch_history["user_id"].unique().tolist()
    user_2_index = {x: i for i, x in enumerate(user_ids)}
    index_2_userid = {i: x for i, x in enumerate(user_ids)}

    user_watch_history['user_id_encoded'] = user_watch_history['user_id'].map(user_2_index)
    user_watch_history['song_id_encoded'] = user_watch_history['song_id'].map(song_2_index)

    """### Model Layers

    Features Layers: Handle Textual Search Queries <br/>
    Labels Layers: Handle Watch History

    <br/>

    ---

    <br/>

    Some Custom Layers Are Also Defined
    - Embedding Layers
    - Normalization Layers
    - Masking Layer
    - Relu and LeakyRelu Layers
    - Softmax Activation

    ### Custom Layers
    - Masking Layer
    - L2 Normalization Layer
    """

    """### Prebuilt Model Layers"""

    features_embedding_layer = keras.layers.Embedding(input_dim=NUM_CLASSES, output_dim=EMBEDDING_DIMS, mask_zero=True,
                                                      trainable=True, name='searched_embeddings')
    labels_embedding_layer = keras.layers.Embedding(input_dim=NUM_CLASSES, output_dim=EMBEDDING_DIMS, mask_zero=True,
                                                    trainable=True, name='watched_embeddings')

    avg_embeddings = MaskedEmbeddingsAggregatorLayer(agg_mode='mean', name='aggregate_embeddings')

    dense_1 = keras.layers.Dense(units=DENSE_UNITS, name='dense_1')
    dense_2 = keras.layers.Dense(units=DENSE_UNITS, name='dense_2')
    dense_3 = keras.layers.Dense(units=DENSE_UNITS, name='dense_3')
    l2_norm_1 = L2NormLayer(name='l2_norm_1')

    dense_output = keras.layers.Dense(NUM_CLASSES, activation=nn.softmax, name='dense_output')

    """### L2 Normalize Inputs
    - Normalize - Average Inputs
    - Concat as Single Layer
    """

    searched_embeddings = features_embedding_layer(search_queries)
    l2_norm_searched = l2_norm_1(searched_embeddings)
    avg_searched = avg_embeddings(l2_norm_searched)

    labels_watched_embeddings = labels_embedding_layer(watch_history)
    l2_norm_watched = l2_norm_1(labels_watched_embeddings)
    avg_watched = avg_embeddings(l2_norm_watched)

    concat_inputs = keras.layers.Concatenate(axis=1)([avg_searched, avg_watched])

    """### Dense Layers
    Contains:
    - DenseLayers
    - BatchNormalization Layers
    - Relu Layers
    """

    dense_1_features = dense_1(concat_inputs)
    dense_1_relu = keras.layers.ReLU(name='dense_1_relu')(dense_1_features)
    dense_1_batch_norm = keras.layers.BatchNormalization(name='dense_1_batch_norm')(dense_1_relu)

    dense_2_features = dense_2(dense_1_relu)
    dense_2_relu = keras.layers.ReLU(name='dense_2_relu')(dense_2_features)

    dense_3_features = dense_3(dense_2_relu)
    dense_3_relu = keras.layers.ReLU(name='dense_3_relu')(dense_3_features)
    dense_3_batch_norm = keras.layers.BatchNormalization(name='dense_3_batch_norm')(dense_3_relu)

    outputs = dense_output(dense_3_batch_norm)

    """### Compiling the Model"""

    optimiser = keras.optimizers.Adam(learning_rate=LEARNING_RATE)
    loss = 'sparse_categorical_crossentropy'

    model = keras.models.Model(
        inputs=[search_queries, watch_history],
        outputs=[outputs]
    )

    logdir = os.path.join("logs", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))
    tensorboard_callback = keras.callbacks.TensorBoard(logdir, histogram_freq=1)

    model.compile(optimizer=optimiser, loss=loss)

    """## Training

     ### Encode Data to Feed to the Model
     """

    user_watched_group = user_watch_history.groupby(['user_id_encoded'])['song_id_encoded'].apply(list).reset_index()
    # user_search_group = user_search_history.groupby(['user_id'])['query'].apply(list).reset_index()
    user_watched_group['past_predicted'] = user_watched_group['song_id_encoded'].apply(lambda x: (x[-1]))

    print("Not Adding Search Features Currently")
    filepath = "../../model-snapshots/next-song-prediction/model.h5"
    checkpoint = keras.callbacks.ModelCheckpoint(model_snapshot_location, monitor='loss', verbose=1, save_best_only=True, mode='min')
    callbacks_list = [checkpoint, tensorboard_callback]

    model.fit([
        keras.preprocessing.sequence.pad_sequences(user_watched_group['song_id_encoded']),
        keras.preprocessing.sequence.pad_sequences(user_watched_group['song_id_encoded']),
        # Not Adding Search Features Currently
    ], user_watched_group['past_predicted'].values, callbacks=[callbacks_list], steps_per_epoch=1, epochs=100,
        verbose=1)

    print("Model Retrained")


if __name__ == '__main__':
    ReTrainModel()
