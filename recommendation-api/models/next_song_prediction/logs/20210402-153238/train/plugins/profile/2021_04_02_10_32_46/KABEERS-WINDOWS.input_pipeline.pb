	?J?4@?J?4@!?J?4@	???v@???v@!???v@"e
=type.googleapis.com/tensorflow.profiler.PerGenericStepDetails$?J?4@?d?`TR??A	?c? @Y?g??s???*	     ??@2f
/Iterator::Model::ParallelMapV2::Zip[0]::FlatMap?Q???!?B???YK@)Zd;?O???1??8??J@:Preprocessing2u
>Iterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch::Map?A`??"??!Zb?{BC@)      ??1\??7?QA@:Preprocessing2?
LIterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch::Map::FiniteRepeatJ+???!?_Iʆ	@)
ףp=
??1o?M???@:Preprocessing2F
Iterator::Model?(??0??!?Y??)@)??ݓ????1ʆ	??g @:Preprocessing2U
Iterator::Model::ParallelMapV2$????ۗ?!h???[???)$????ۗ?1h???[???:Preprocessing2l
5Iterator::Model::ParallelMapV2::Zip[1]::ForeverRepeat?
F%u??!}ʕ? @)??ׁsF??1$tm\H??:Preprocessing2Z
#Iterator::Model::ParallelMapV2::Zip?/L?
F??! ?
??L@)?I+???1???-????:Preprocessing2p
9Iterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch??_vO??!V
	]??)??_vO??1V
	]??:Preprocessing2x
AIterator::Model::ParallelMapV2::Zip[1]::ForeverRepeat::FromTensorǺ???v?!Pۚ<{`??)Ǻ???v?1Pۚ<{`??:Preprocessing2v
?Iterator::Model::ParallelMapV2::Zip[0]::FlatMap[5]::TensorSlicen??t?!??k???)n??t?1??k???:Preprocessing2?
SIterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch::Map::FiniteRepeat::Range????Mbp?!?S?O?D??)????Mbp?1?S?O?D??:Preprocessing2v
?Iterator::Model::ParallelMapV2::Zip[0]::FlatMap[4]::TensorSlice_?Q?[?!????:??)_?Q?[?1????:??:Preprocessing:?
]Enqueuing data: you may want to combine small input data chunks into fewer but larger chunks.
?Data preprocessing: you may increase num_parallel_calls in <a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#map" target="_blank">Dataset map()</a> or preprocess the data OFFLINE.
?Reading data from files in advance: you may tune parameters in the following tf.data API (<a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#prefetch" target="_blank">prefetch size</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#interleave" target="_blank">interleave cycle_length</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/TFRecordDataset#class_tfrecorddataset" target="_blank">reader buffer_size</a>)
?Reading data from files on demand: you should read data IN ADVANCE using the following tf.data API (<a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#prefetch" target="_blank">prefetch</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#interleave" target="_blank">interleave</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/TFRecordDataset#class_tfrecorddataset" target="_blank">reader buffer</a>)
?Other data reading or processing: you may consider using the <a href="https://www.tensorflow.org/programmers_guide/datasets" target="_blank">tf.data API</a> (if you are not using it now)?
:type.googleapis.com/tensorflow.profiler.BottleneckAnalysis?
both?Your program is POTENTIALLY input-bound because 7.6% of the total step time sampled is spent on 'All Others' time (which could be due to I/O or Python execution or both).no*no9???v@Ih?ϫJX@Zno>Look at Section 3 for the breakdown of input time on the host.B?
@type.googleapis.com/tensorflow.profiler.GenericStepTimeBreakdown?
	?d?`TR???d?`TR??!?d?`TR??      ??!       "      ??!       *      ??!       2		?c? @	?c? @!	?c? @:      ??!       B      ??!       J	?g??s????g??s???!?g??s???R      ??!       Z	?g??s????g??s???!?g??s???b      ??!       JCPU_ONLYY???v@b qh?ϫJX@