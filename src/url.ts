// https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/
// http://nodejs.cn/api/url.html#url_class_urlsearchparams
// 在node和现代浏览器中，内置了 URL 和 URLSearchParams 来实现url和url参数的操作

/**
 * 获取URL中的参数
 * @param {string} name 要获取的name
 * @returns {string | null} 返回name对应的数据，若不存在则返回null
 */
export const getQueryString = (name: string, search = window.location.search): string | null => {
    if (typeof window.URLSearchParams === "function") {
        const u = new window.URLSearchParams(search);
        return u.get(name);
    } else {
        const reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
        const res = search.match(reg);

        if (res && res.length > 1) {
            return decodeURIComponent(res[1]);
        }
        return null;
    }
};

/**
 * 解析url中所有的参数
 * @param {string} search
 * @returns {object} obj 所有的参数
 */
export const queryParse = (search = window.location.search) => {
    const result: {
        [name: string]: string;
    } = {};
    if (typeof window.URLSearchParams === "function") {
        const u = new window.URLSearchParams(search);
        u.forEach((value, name) => {
            result[name] = decodeURIComponent(value);
        });
    } else {
        const arr = search.substr(1).split("&");
        arr.forEach((item) => {
            const [name, value] = item.split("=");
            result[name] = decodeURIComponent(value);
        });
    }
    return result;
};

/**
 * 把url类型的字符串解析出各个的字段
 *
 * @param {string} url 要解析的字符串
 * @returns {URL}
 */
export const urlParse = (url: string): URL => {
    if (typeof window !== "undefined" && typeof window.URL === "function") {
        return new window.URL(url);
    } else {
        const a = document.createElement("a");
        a.href = url;

        return {
            href: url,
            protocol: a.protocol.replace(":", ""),
            host: a.hostname,
            hostname: a.hostname,
            origin: a.origin,
            pathname: a.pathname,
            password: a.password,
            username: a.username,
            // @ts-ignore
            searchParams: {}, // 在使用a标签解析url的过程中，并没有对应的实现searchparams中的方法
            port: a.port,
            search: a.search,
            hash: a.hash.replace("#", ""),
            toJSON: () => url
        };
    }
};

interface QueryToStringProps {
    [name: string]: any;
}
/**
 * 将obj类型的数据，拼接为可识别的url参数字符串
 * @param {object} query 要解析的obj
 * @returns {string}
 */
export const queryStringify = (query: QueryToStringProps): string => {
    let str: string = "";
    let name: string = "";
    for (name in query) {
        let item = query[name];
        if (typeof item === "object") {
            item = JSON.stringify(item);
        }
        str += `&${name}=${encodeURIComponent(item)}`;
    }
    return str.substr(1);
};
