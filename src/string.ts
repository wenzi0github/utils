/**
 * 获取URL中的参数
 * @param {string} name 要获取的name
 * @returns {string | null} 返回name对应的数据，若不存在则返回null
 */
export const getQueryString = (name: string): string | null => {
    const reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
    const res = window.location.search.match(reg);

    if (res && res.length > 1) {
        return decodeURIComponent(res[1]);
    }
    return null;
};

/**
 * 替换字符串中{key}为具体的数据，若在params中不存在要替换的key，则原样保留
 * @param {string} str 要更新的字符串
 * @param {object} params 替换的数据
 * @returns {string} 更新完成后的字符串
 */
export const strReplace = (str: string, params: any = {}): string => {
    const reg = new RegExp("{(.+?)}", "g"); // /{(.+?)}/g
    return str.replace(reg, ($1, $2) => {
        if ($1 && params.hasOwnProperty($2)) {
            return params[$2];
        }
        return $1;
    });
};

/**
 * 截取字符串
 * @param {string} str 要截取的字符串，中文按照1个字符计算
 * @param {number} size 截取的长度
 * @param {string} tail 结尾延伸的字符串，默认是3个点
 * @returns {string} 截取后的字符串
 */
export const truncate = (str: string, size: number, tail?: string) => {
    function trim(str: string) {
        if (isEmpty(str)) {
            return str;
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    function isEmpty(str: any) {
        if (str === undefined || str === "" || str === null) {
            return true;
        }
        return false;
    }

    let nstr = trim(str);

    const arr = Array.from(str);

    let cLen = arr.length;
    let length = size <= 0 ? cLen : size;
    if (length > cLen) return nstr;
    nstr = arr.slice(0, length).join("");
    nstr += tail || "...";

    return nstr;
};
