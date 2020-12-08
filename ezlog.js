/** 该文件是用于处理日志文件的类 
 * 等级为: 
  error: 0, 
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
 * 
*/

var temp = ""
var realLog = ""
var pointLog = ""
var logPath = "log/"
var names = ""
var logger = null

let timeCurrent = timeStapInDay()
let namesCurrent = ""
let filePathCurrent = ""

var ezlog = {
    init(appName, filePath = logPath, isdebug = false) {
        if (appName == "") {
            names = "unknow"
        } else {
            names = appName
        }
        if (filePath != "") {
            logPath = filePath
        }
        let debugMode = "debug"
        if(!isdebug){
            debugMode = "verbose"
        }
        namesCurrent = names
        filePathCurrent = logPath
        const { createLogger, format, transports } = require('winston');
        const { combine, timestamp, label, printf } = format;
        const myFormat = printf(({ level, message, timestamp }) => {
            return `${timeStap()} [${level}]: ${message}`;
        });
        // 库的主要功能来自于 winston
        logger = createLogger({
            format: combine(
                timestamp(),
                myFormat
            ),
            transports: [
                new transports.Console({ level: debugMode }),
                new transports.File({ filename: logPath + names + "-" + timeStapInDay() + '.log', level: 'verbose' })
            ]
        });
    },
    d(log) {
        logger.debug(log)
    },
    v(log) {
        checkCurrentDay();
        if (checkLogRepeat(log)) {
            logger.verbose(realLog)
        } else {
            logger.debug(log)
        }
    },
    i(log) {
        if (checkLogRepeat(log)) {
            logger.info(realLog)
        } else {
            logger.debug(log)
        }
    },
    w(log) {
        if (checkLogRepeat(log)) {
            logger.warn(realLog)
        } else {
            logger.debug(log)
        }
    },
    e(log) {
        if (checkLogRepeat(log)) {
            logger.error(realLog)
        } else {
            logger.debug(log)
        }
    }
    ,

}

/**
 * 检查日志是否重复, 如果是重复的话, 用 . 代替, 该方法用于类似于心跳的方法, 会占用大量日志资源
 * @param {old}} log 
 */
function checkLogRepeat(log) {
    checkCurrentDay();
    if (log == temp) {
        pointLog = pointLog + "."
        return false
    } else {
        if (pointLog != "") {
            logger.info(pointLog)
        }
        temp = log
        realLog = log
        pointLog = ""
        return true
    }
}

/**
 * 日志跨天检测
 */
function checkCurrentDay() {
    if (timeCurrent === timeStapInDay()) {
        // good
    } else {
        this.init(namesCurrent, filePathCurrent);
        timeCurrent = timeStapInDay()
    }
}

/**
 * 时间戳, 到日 2020-09-09
 */
function timeStapInDay() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month.toString()
    if (month.length == 1) {
        month = "0" + month
    }
    var day = date.getDate();
    day = day.toString()
    if (day.length == 1) {
        day = "0" + day
    }
    return (year + '-' + month + '-' + day)
}


/**
 * 时间戳, 到毫秒
 * 2020-09-09 21:32:21:128
 */
function timeStap() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month.toString()
    if (month.length == 1) {
        month = "0" + month
    }
    var day = date.getDate();
    day = day.toString()
    if (day.length == 1) {
        day = "0" + day
    }
    var hour = date.getHours();
    hour = hour.toString()
    if (hour.length == 1) {
        hour = "0" + hour
    }
    var minute = date.getMinutes();
    minute = minute.toString()
    if (minute.length == 1) {
        minute = "0" + minute
    }
    var second = date.getSeconds();
    second = second.toString()
    if (second.length == 1) {
        second = "0" + second
    }
    var mis = date.getMilliseconds();
    mis = mis.toString()
    if (mis.length == 1) {
        mis = "00" + mis
    } else if (mis.length == 2) {
        mis = "0" + mis
    }
    return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + "." + mis)
}
module.exports = ezlog;