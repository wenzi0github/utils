// http://www.fynas.com/ua
// https://github.com/fynas/ua/blob/master/ua_string.csv
// https://github.com/KHwang9883/MobileModels

/**
 * 获取当前系统和版本号
 */
export const getSystemInfo = (uagt?: string) => {
    const os = {
        name: "",
        version: "",
        ios: false,
        android: false,
        manufacture: "", // 手机品牌
        model: "", // 品牌中的型号
        build: "" // 生产流水线，一般与型号对应，但型号对用户来说更加直观。例如小米2s中，品牌为xiaomi，型号为2s，流水线为JRO03L
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
        windows: userAgent.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),
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
            xiaomi: /hm|mi/i.test(userAgent), // 小米手机
            redmi: /redmi/.test(userAgent), // 红米手机
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
        const modelType = userAgent.match(/zh-cn;(.*)build/);
        if (modelType && modelType.length >= 2) {
            os.model = modelType[1].replace(os.manufacture, "").replace(/(^\s*)|(\s*$)/g, "");
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
    | "weishi";

/**
 * 获取当前APP和版本号
 */
export const getBrowserInfo = (uagt?: string) => {
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
        weishi: userAgent.match(/weishi_(\d+?\.\d+?\.\d+?)/i)
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
