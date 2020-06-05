interface ParseOptions {
    decode?: (value: string) => string;
}

/**
 * 解析url中所有的参数
 * @param {string} search
 * @returns {object} obj 所有的参数
 */
export const parse = (
    search: string = window.location.search,
    options: ParseOptions = {
        decode: window.decodeURIComponent
    }
): {
    [name: string]: string;
} => {
    const decode = options && typeof options.decode === "function" ? options.decode : window.decodeURIComponent;
    let result: {
        [name: string]: string;
    } = {};
    if (typeof window.URLSearchParams === "function") {
        const u = new window.URLSearchParams(search);
        u.forEach((value, name) => {
            result[name] = decode(value);
        });
    } else {
        const arr = search.substr(1).split("&");
        arr.forEach((item) => {
            const [name, value] = item.split("=");
            result[name] = decode(value);
        });
    }
    return result;
};

/**
 * 获取查询字符串中的参数
 * @param {string} name 要获取的name
 * @returns {string | null} 返回name对应的数据，若不存在则返回null
 */
export const getQueryString = (name: string, search = window.location.search) => {
    const results = parse(search);
    return results[name] || null;
};

interface StringiyOptions {
    encode?: (value: any) => string | number;
}

/**
 * 将obj类型的数据，拼接为可识别的url参数字符串
 * @param {object} query 要解析的obj
 * @returns {string}
 */
export const stringify = (
    query: { [name: string]: any },
    sep?: string | undefined | null,
    eq?: string | undefined | null,
    options: StringiyOptions = { encode: window.encodeURIComponent }
): string => {
    let str: string = "";
    let name: string = "";
    const seqChar = sep ? sep : "&";
    const eqChar = eq ? eq : "=";
    const encode = options && typeof options.encode === "function" ? options.encode : window.encodeURIComponent;
    for (name in query) {
        let item = query[name];
        if (typeof item === "object") {
            item = JSON.stringify(item);
        }
        str += `${seqChar}${name}${eqChar}${encode(item)}`;
    }
    return str.substr(1);
};
