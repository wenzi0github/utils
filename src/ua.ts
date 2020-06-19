// http://www.fynas.com/ua
// https://github.com/fynas/ua/blob/master/ua_string.csv
// https://github.com/KHwang9883/MobileModels

type SystemName = "iphone" | "ipad" | "android" | "windows" | "";

interface SystemInfo {
    name: SystemName;
    version: string;
    ios: boolean;
    android: boolean;
    manufacture: string;
    model: string;
    build: string;
    nettype: string;
}

/**
 * 获取当前系统和版本号
 * @param {string} uagt 要传入的ua，若不传入，则使用当前页面的ua
 * @returns {SystemInfo} 返回系统的信息
 */
export const getSystemInfo = (uagt?: string): SystemInfo => {
    const os: SystemInfo = {
        name: "",
        version: "",
        ios: false,
        android: false,
        manufacture: "", // 手机品牌
        model: "", // 品牌中的型号
        build: "", // 生产流水线，一般与型号对应，但型号对用户来说更加直观。例如小米2s中，品牌为xiaomi，型号为2s，流水线为JRO03L
        nettype: "" // 网络状态
    };
    if (typeof window === "undefined") {
        return os;
    }
    const userAgent = (uagt || window.navigator.userAgent).toLocaleLowerCase();
    const osTypes = {
        iphone: userAgent.match(/(iphone)\s(os\s)?([\d_]+)/i),
        ipad: userAgent.match(/(ipad).*\s([\d_]+)/i),
        ipod: userAgent.match(/(ipod).*\s([\d_]+)/i),
        android: userAgent.match(/(android)\s([\d.]+)/i),
        windows: userAgent.match(/windows(\s+\w+)?\s+?(\d+\.\d+)/),
        ios: /(iphone|ipad|ipod|ios)/i.test(userAgent)
    };
    if (osTypes.iphone) {
        os.name = "iphone";
        os.version = osTypes.iphone[3].replace(/_/g, ".");
        os.ios = true;
    } else if (osTypes.android) {
        os.name = "android";
        os.version = osTypes.android[2];
        os.android = true;

        const androidTypes = {
            samsung: userAgent.match(/(gt|sm|sch)-(.*)\s+/), // 三星手机
            huawei: /huawei|honor/.test(userAgent), // 华为手机
            honor: /honor/.test(userAgent), // 荣耀系列
            vivo: /vivo/.test(userAgent), // vivo手机
            redmi: /redmi/.test(userAgent), // 红米手机
            xiaomi: /hm|mi/i.test(userAgent) && !/redmi/.test(userAgent), // 小米手机
            oppo: /oppo/.test(userAgent), // OPPO
            oneplus: /oneplus/.test(userAgent) // 一加手机
        };
        // 匹配机型
        for (let key in androidTypes) {
            if ((androidTypes as any)[key]) {
                os.manufacture = key;
                break;
            }
        }
        // 匹配型号
        const modelType = userAgent.match(/;(\szh-cn;)?\s(.*)\sbuild/i);
        if (modelType && modelType.length >= 3) {
            const models = modelType[2].split(";");
            os.model = models[models.length - 1].replace(os.manufacture, "").replace(/(^\s*)|(\s*$)/g, "");
        }
        // 匹配流水线
        const buildType = userAgent.match(new RegExp(`build/(${os.manufacture})?(.*?)[()|;)$]`));
        if (buildType && buildType.length >= 3) {
            os.build = buildType[2];
        }
    } else if (osTypes.ipad) {
        os.name = "ipad";
        os.version = osTypes.ipad[2].replace(/_/g, ".");
        os.ios = true;
    } else if (osTypes.windows) {
        os.name = "windows";
        os.version = osTypes.windows[2];
    }

    const network = userAgent.match(/nettype\/(.*)\s+/);
    if (network) {
        os.nettype = network[1];
    }

    return os;
};

type BrowserInfoKeys =
    | "weibo"
    | "qqnewslite"
    | "qqnews"
    | "weixin"
    | "mqqbrowser"
    | "qq"
    | "tenvideo"
    | "qqmusic"
    | "qqac"
    | "tadchid"
    | "ucbrowser"
    | "chrome"
    | "safari"
    | "hwbrowser"
    | "qzone"
    | "weishi"
    | "miuibrowser";

/**
 * 获取当前APP和版本号
 * @param {string} uagt 要传入的ua，若不传入，则使用当前页面的ua
 * @returns {{name: BrowserInfoKeys | '', version: string}} 所在app的名称和版本号
 */
export const getBrowserInfo = (
    uagt?: string
): {
    name: BrowserInfoKeys | "";
    version: string;
} => {
    const browser: {
        name: BrowserInfoKeys | "";
        version: string;
    } = {
        name: "",
        version: ""
    };
    if (typeof window === "undefined") {
        return browser;
    }
    const userAgent = (uagt || window.navigator.userAgent).toLocaleLowerCase();

    // 腾讯系的APP要先判断是否在广告webview中
    // 之前广平的webview只有他自己的标识，现在会加上其所在APP的标识
    // 若不先判处，则容易被误判在真实的客户端内，导致使用真实APP的jsapi时发生错误
    const browserTypes: {
        [key in BrowserInfoKeys]: RegExpMatchArray | null;
    } = {
        weibo: userAgent.match(/weibo/), // 新浪微博
        qqnewslite: /tadchid/.test(userAgent) ? null : userAgent.match(/qqnewslite\/(\d+\.\d+\.\d+)/), // 极速版新闻客户端
        qqnews: /tadchid/.test(userAgent) ? null : userAgent.match(/qqnews\/(\d+\.\d+\.\d+)/), // 新闻客户端
        weixin: userAgent.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || userAgent.match(/MicroMessenger\/((\d+)\.(\d+))/), // 微信
        mqqbrowser: userAgent.match(/mqqbrowser\/(\d+\.\d+)/), // QQ浏览器
        qq: userAgent.match(/qq\/(\d+\.\d+)/), // 手机QQ
        tenvideo: userAgent.match(/qqlivebrowser/), // 腾讯视频
        qqmusic: userAgent.match(/qqmusic/), // QQMUSIC
        qqac: userAgent.match(/qqac_client/), // 腾讯动漫
        tadchid: userAgent.match(/tadchid\/(\d+)/), // 广告webview
        ucbrowser: userAgent.match(/ucbrowser\/(\d+\.\d+)/i), // UC浏览器
        chrome: /android/.test(userAgent) ? userAgent.match(/chrome\/(\d+\.\d+)/) : userAgent.match(/crios\/(\d+\.\d+)/),
        safari: userAgent.match(/safari\/(\d+\.\d+)/),
        hwbrowser: userAgent.match(/huawei|honor/), // 华为手机
        qzone: userAgent.match(/qzone\/[\w\d_]*(\d\.\d)[.\w\d_]*/i), // 手机QQ空间
        weishi: userAgent.match(/weishi_(\d+?\.\d+?\.\d+?)/i), // 微视
        miuibrowser: userAgent.match(/miuibrowser\/(\d+?\.\d+?\.\d+?)/i) // 小米自带的浏览器
    };
    let key: BrowserInfoKeys = "mqqbrowser";
    for (key in browserTypes) {
        const type: RegExpMatchArray | null = (browserTypes as any)[key];
        if (type) {
            browser.version = type[1] || "0";
            browser.name = key;
            break;
        }
    }
    return browser;
};
