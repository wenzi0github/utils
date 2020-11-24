/**
 * 将数字转为千分位
 * @param {number} num 将要转换的数字
 * @returns {string} 转换后的字符串
 */
export const toThousands = (num: number): string => {
    if (typeof Number.prototype.toLocaleString === "function") {
        return num.toLocaleString();
    }
    return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};

// 获取随机数
export const getRandom = (len = 6): string => {
    return Math.random().toString(36).substring(len);
};
