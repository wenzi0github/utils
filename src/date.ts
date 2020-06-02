/**
 * 比较两个时间戳是否在同一天
 * @param {number|string} timestampa 时间戳1
 * @param {number|string} timestampb 时间戳2，默认是当前的时间戳
 * @return {boolean} 返回两个时间戳对比后的结果
 */
export const isSameDay = (timestampa: number | string, timestampb: number | string = Date.now()): boolean => {
    const getADate = (timestamp: number | string): string => {
        // 在iOS系统中，2018-11-29这样的日期是无法转换的，需要转换成2018/11/29
        const date = typeof timestamp === "number" ? parseInt(timestamp + "", 10) : timestamp.replace(/-/g, "/");
        return new Date(date).toLocaleDateString();
    };
    return getADate(timestampa) === getADate(timestampb);
};

/**
 * 格式化时间，时间戳->格式化
 * @param timestamp 传入的时间戳，单位（毫秒）
 * @param format 格式：yyyy/MM/dd hh:mm:ss
 */
export const formatTime = (timestamp: number, format: string = "yyyy/MM/dd hh:mm:ss") => {
    const date = new Date(timestamp);
    let dateFormat: any = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds() // 秒
    };

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (dateFormat["y+"] + "").substr(4 - RegExp.$1.length));
    }
    for (let key in dateFormat) {
        if (new RegExp("(" + key + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? dateFormat[key] : ("00" + dateFormat[key]).substr(("" + dateFormat[key]).length));
        }
    }
    return format;
};

/**
 * 获取当前星期的起始日期和结束日期
 * @param {string} startFormat 周一的时间格式
 * @param {string} endFormat   周日的时间格式
 * @param {number} timestamp   所在周的时间戳，若不传入，则默认使用当前时刻的时间戳
 * @returns {string, string} {startDate, endDate} 返回的数据
 */
export const getWeekStartAndEnd = (
    startFormat: string,
    endFormat: string,
    timestamp?: number
): {
    startDate: string;
    endDate: string;
} => {
    const oneDayTime = 1000 * 3600 * 24;
    const nowDate = timestamp ? new Date(timestamp) : new Date();
    const now = nowDate.getTime();
    const nowDay = nowDate.getDay() === 0 ? 7 : nowDate.getDay();
    const startDate = new Date(now - oneDayTime * (nowDay - 1));
    const endDate = new Date(now + oneDayTime * (7 - nowDay));

    return {
        startDate: formatTime(startDate.getTime(), startFormat),
        endDate: formatTime(endDate.getTime(), endFormat)
    };
};

/**
 * 延迟一段时间执行
 *
 * @param {number} timeout 延迟的时间
 * @returns {Promise} 返回一个Promise对象
 */
export const sleep = (timeout: number): Promise<any> => {
    if (timeout <= 17) {
        // 低于17毫秒，则使用requestAnimationFrame来实现
        const requestAnimation = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        return new Promise((resolve) => requestAnimation(resolve));
    }
    return new Promise((resolve) => setTimeout(resolve, timeout));
};
