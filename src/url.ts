// https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/
// http://nodejs.cn/api/url.html#url_class_urlsearchparams
// 在node和现代浏览器中，内置了 URL 和 URLSearchParams 来实现url和url参数的操作

import * as qs from "./querystring";

/**
 * 把url类型的字符串解析出各个的字段
 *
 * @param {string} url 要解析的字符串
 * @returns {URL}
 */
export const parse = (url: string = window.location.href): URL => {
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

interface StringIfyOptions {
    protocol?: "http:" | "https:" | "file:";
    port?: string;
    hostname?: string;
    pathname?: string;
    query?: {
        [name: string]: any;
    };
}

/**
 * 将几个部分拼接为一个完整的url
 * @param {StringIfyOptions} param 部分参数
 * @returns {string} 拼接后的url
 */
export const stringify = ({ protocol = "https:", port = "", hostname = "", pathname = "", query }: StringIfyOptions): string => {
    let _query = "";
    if (query) {
        _query = "?" + qs.stringify(query);
    }
    return protocol + "//" + hostname + (port ? ":" + port : port) + pathname + _query;
};

/**
 * 将几个部分拼接为一个完整的url
 * @param {StringIfyOptions} param 部分参数
 * @returns {string} 拼接后的url
 */
export const format = (params: StringIfyOptions): string => {
    return stringify(params);
};

/**
 * check url if absolute
 * @param {string} url
 * @returns {boolean}
 */
export const isAbsolute = (url: string): boolean => {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

export const http2https = (url: string): string => {
    if (/^http:\/\//.test(url)) {
        return url.replace("http://", "https://");
    }
    return url;
};
