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

/**
 * 获取合理范围内的数字，若超过边界，则使用边界的数字
 * @param {number} num 当前要判断的数字
 * @param {number} min 范围的下限
 * @param {number} max 范围的上限
 */
export const getClampNumber = (num: number, min: number, max: number): number => {
    if (num <= min) {
        return min;
    }
    if (num >= max) {
        return max;
    }
    return num;
};
