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
export const truncate = (str: string, size: number, tail?: string): string => {
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

    const arr = Array.from(nstr);

    let cLen = arr.length;
    let length = size <= 0 ? cLen : size;
    if (length >= cLen) return nstr;
    nstr = arr.slice(0, length).join("");
    nstr += tail || "...";

    return nstr;
};

/**
 * 加载js文件
 * @param {string} url 要加载的js文件链接
 * @returns {Promise} 返回一个Promise对象，若加载失败或者超时，则reject
 */
export const loadScript = (url: string): Promise<null> => {
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    const timeout: number = 6000; // 过期时间
    let timer: any = null;

    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", "UTF-8");
    script.setAttribute("src", url);

    const cleanup = () => {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
        if (timer) {
            clearTimeout(timer);
        }
    };
    head.appendChild(script);

    return new Promise((resolve, reject) => {
        // 执行回调
        const callbackFn = () => {
            if (timer) {
                clearTimeout(timer);
            }
            resolve();
        };

        script.onload = () => {
            callbackFn();
        };
        script.onerror = reject;

        if (timeout) {
            timer = setTimeout(() => {
                cleanup();
                reject(new Error(`get ${url} timeout`));
            }, timeout);
        }
    });
};

/**
 * 加载js文件
 * @param {string} url 要加载的js文件链接
 * @returns {Promise} 返回一个Promise对象，若加载失败或者超时，则reject
 */
export const getScript = loadScript;
