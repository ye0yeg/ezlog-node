### ezlog
### 安装方法
`npm install @ye0yeg/ezlog`

#### 1: 如何使用ezlog

##### 1: 使用之前先注册, 需要全局进行注册
```js
 ezlog.init(appName, filename = "/log/", isdebug = false)
```

第一个参数: appName不可为空, 传入应用名称/日志名称 
第二个参数: fileName 可不填, 不填写默认为"/log/"
第三个参数: isdbug 可不填, 默认为false

##### 如果isdebug为false, 那么只会存储和打印 大于等于verbose等级的日志
##### 如果isdbug为true, 那么控制台会输出所有日志, 但是不会存储debug日志, 包含debug

##### 日志名称为: {{your_appname}}-{{date}}.log 例如: myapp_1.0.0-2020-12-12.log




2: 日志分级为:  
```js
  error:   0 
  warn:    1 
  info:    2 
  verbose: 3 
  debug:   4  
```
使用方法ezlog.i("log")  =输出=> 
2019-08-07 02:53:34.441 [info]: log
日志输出级别: debug 以上
文件存储级别: verbose 以上
例如: 
```js
  ezlog.w("warn")
  ezlog.e("error")
  ezlog.i("info")
  ezlog.v("verbose")
  ezlog.d("debug")
```
输出到控制台: 
```js
  2019-08-07 03:09:58.026 [warn]: warn
  2019-08-07 03:09:58.028 [error]: error
  2019-08-07 03:09:58.029 [info]: info
  2019-08-07 03:09:58.032 [verbose]: verbose
  2019-08-07 03:09:58.030 [debug]: debug
```
输出到文件夹: 
```js
  2019-08-07 03:12:01.910 [warn]: warn
  2019-08-07 03:12:01.913 [error]: error
  2019-08-07 03:12:01.914 [info]: info
  2019-08-07 03:12:01.914 [verbose]: verbose
```

TODO:
  a: 日志存储到一定规模的时候可以删除之前不要的数据
  b: 只打印/不存储的模式
