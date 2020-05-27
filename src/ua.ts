const userAgent = window.navigator.userAgent.toLocaleLowerCase();

// 获取当前系统和版本号
export const getSystemInfo = () => {
    const os = {
        name: "",
        version: "",
        ios: false,
        android: false
    };
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
    } else if (osTypes.ipad) {
        os.name = "ipad";
        os.version = osTypes.ipad[2].replace(/_/g, ".");
        os.ios = true;
    }
    return os;
};

// 获取当前APP和版本号
export const getBrowserInfo = () => {
    const browser = {
        name: "",
        version: ""
    };
    // 腾讯系的APP要先判断是否在广告webview中
    // 之前广平的webview只有他自己的标识，现在会加上其所在APP的标识
    // 若不先判处，则容易被误判在真实的客户端内，导致使用真实APP的jsapi时发生错误
    const browserTypes = {
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
        ucbrowser: userAgent.match(/ucbrowser\/(\d+\.\d+)/i) // UC浏览器
    };
    for (let key in browserTypes) {
        const type: RegExpMatchArray | null = (browserTypes as any)[key];
        if (type) {
            browser.version = type[1] || "0";
            browser.name = key;
            break;
        }
    }
    return browser;
};
