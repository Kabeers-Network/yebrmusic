?	?^)?=@?^)?=@!?^)?=@	?!"??!>@?!"??!>@!?!"??!>@"e
=type.googleapis.com/tensorflow.profiler.PerGenericStepDetails$?^)?=@B>?٬?%@A?A`???"@Yj?t??!@*	3333?@?@2F
Iterator::ModelM?Oo!@!3?lm?QW@)x??#?\!@1?s9W@:Preprocessing2f
/Iterator::Model::ParallelMapV2::Zip[0]::FlatMapΈ?????!
???k?@)?n?????1?L?%@:Preprocessing2u
>Iterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch::Map????!$?f:@)??镲??1??)?? @:Preprocessing2?
LIterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch::Map::FiniteRepeatDio??ɤ?!!ip????)U???N@??1`I?????:Preprocessing2U
Iterator::Model::ParallelMapV2????镢?!?3^????)????镢?1?3^????:Preprocessing2l
5Iterator::Model::ParallelMapV2::Zip[1]::ForeverRepeat46<?R??!,ԈG????)???{????1??i?NS??:Preprocessing2p
9Iterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch9??v????!????8???)9??v????1????8???:Preprocessing2Z
#Iterator::Model::ParallelMapV2::Zip??u????!?^????@)n????1?eغ?:Preprocessing2x
AIterator::Model::ParallelMapV2::Zip[1]::ForeverRepeat::FromTensor?I+?v?!?{??!??)?I+?v?1?{??!??:Preprocessing2v
?Iterator::Model::ParallelMapV2::Zip[0]::FlatMap[5]::TensorSlice??ZӼ?t?!???????)??ZӼ?t?1???????:Preprocessing2?
SIterator::Model::ParallelMapV2::Zip[0]::FlatMap::Prefetch::Map::FiniteRepeat::Range?~j?t?h?!d????o??)?~j?t?h?1d????o??:Preprocessing2v
?Iterator::Model::ParallelMapV2::Zip[0]::FlatMap[4]::TensorSlice?~j?t?X?!d????o??)?~j?t?X?1d????o??:Preprocessing:?
]Enqueuing data: you may want to combine small input data chunks into fewer but larger chunks.
?Data preprocessing: you may increase num_parallel_calls in <a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#map" target="_blank">Dataset map()</a> or preprocess the data OFFLINE.
?Reading data from files in advance: you may tune parameters in the following tf.data API (<a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#prefetch" target="_blank">prefetch size</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#interleave" target="_blank">interleave cycle_length</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/TFRecordDataset#class_tfrecorddataset" target="_blank">reader buffer_size</a>)
?Reading data from files on demand: you should read data IN ADVANCE using the following tf.data API (<a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#prefetch" target="_blank">prefetch</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/Dataset#interleave" target="_blank">interleave</a>, <a href="https://www.tensorflow.org/api_docs/python/tf/data/TFRecordDataset#class_tfrecorddataset" target="_blank">reader buffer</a>)
?Other data reading or processing: you may consider using the <a href="https://www.tensorflow.org/programmers_guide/datasets" target="_blank">tf.data API</a> (if you are not using it now)?
:type.googleapis.com/tensorflow.profiler.BottleneckAnalysis?
host?Your program is HIGHLY input-bound because 30.1% of the total step time sampled is waiting for input. Therefore, you should first focus on reducing the input time.no*high2t37.6 % of the total step time sampled is spent on 'All Others' time. This could be due to Python execution overhead.9?!"??!>@I?w7??wQ@Zno>Look at Section 3 for the breakdown of input time on the host.B?
@type.googleapis.com/tensorflow.profiler.GenericStepTimeBreakdown?
	B>?٬?%@B>?٬?%@!B>?٬?%@      ??!       "      ??!       *      ??!       2	?A`???"@?A`???"@!?A`???"@:      ??!       B      ??!       J	j?t??!@j?t??!@!j?t??!@R      ??!       Z	j?t??!@j?t??!@!j?t??!@b      ??!       JCPU_ONLYY?!"??!>@b q?w7??wQ@Y      Y@q?p4??T@"?

host?Your program is HIGHLY input-bound because 30.1% of the total step time sampled is waiting for input. Therefore, you should first focus on reducing the input time.b
`input_pipeline_analyzer (especially Section 3 for the breakdown of input operations on the Host)Q
Otf_data_bottleneck_analysis (find the bottleneck in the tf.data input pipeline)m
ktrace_viewer (look at the activities on the timeline of each Host Thread near the bottom of the trace view)"T
Rtensorflow_stats (identify the time-consuming operations executed on the CPU_ONLY)"Z
Xtrace_viewer (look at the activities on the timeline of each CPU_ONLY in the trace view)*?
?<a href="https://www.tensorflow.org/guide/data_performance_analysis" target="_blank">Analyze tf.data performance with the TF Profiler</a>*y
w<a href="https://www.tensorflow.org/guide/data_performance" target="_blank">Better performance with the tf.data API</a>2?
=type.googleapis.com/tensorflow.profiler.GenericRecommendation?
nohigh"t37.6 % of the total step time sampled is spent on 'All Others' time. This could be due to Python execution overhead.2no:
Refer to the TF2 Profiler FAQb?82.6% of Op time on the host used eager execution. Performance could be improved with <a href="https://www.tensorflow.org/guide/function" target="_blank">tf.function.</a>2"CPU: B 