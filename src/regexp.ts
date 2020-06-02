// 常用的正则表达式
// 例如，是否正确的手机号/email邮箱/http类型的url
// 解析dom的数据

/**
 * 判断字符串是否为正确的url地址
 * http://, https://, file://均认为是正确的
 *
 * @param {string} url 要判断的字符串
 * @returns {boolean} 是否为正确的url地址
 */
export const isUrl = (url: string): boolean => {
    if (typeof window.URL === "function") {
        try {
            const u = new window.URL(url);
            return !!u.href.length;
        } catch (e) {
            // url解析失败，则认为不是正确的URL地址
            return false;
        }
    }
    const reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return reg.test(url);
};

/**
 * 检测是否为正确的手机号码
 * 
 * @param {string} phone 要检测的字符串
 * @returns {boolean} 是否为正确的手机号码
 */
export const isPhone = (phone: string): boolean => {
    const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    return reg.test(phone);
};

/**
 * 判断字符串是否为正确的email邮箱地址
 * 
 * @param {string} email 要判断的字符串
 * @returns {boolean} 是否为正确的email地址
 */
export const isEmail = (email: string): boolean => {
    const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return reg.test(email);
};
