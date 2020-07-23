import { getSystemInfo, getBrowserInfo, isNewsApp, isLiteNewsApp } from "../src/ua";

describe("case 1", () => {
    it("ios system", () => {
        const { name, version, ios, android } = getSystemInfo();
        expect(name).toBe("");
        expect(version).toBe("");
        expect(ios).toBeFalsy();
        expect(android).toBeFalsy();
    });
    it("ios browser", () => {
        const { name, version } = getBrowserInfo();
        expect(name).toBe("");
        expect(version).toBe("");
    });
});

describe("case 2", () => {
    const ua = "Mozilla/5.0 (iPod; CPU iPhone OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25";
    it("ios system", () => {
        const { name, version, ios, android } = getSystemInfo(ua);
        expect(name).toBe("iphone");
        expect(version).toBe("6.0.1");
        expect(ios).toBeTruthy();
        expect(android).toBeFalsy();
    });
    it("ios browser", () => {
        const { name, version } = getBrowserInfo(ua);
        expect(name).toBe("safari");
        expect(version).toBe("8536.25");
    });
});

describe("case 3", () => {
    const ua =
        "Mozilla/5.0 (Linux; Android 6.0; zh-cn; HUAWEI MT7-CL00 Build/HuaweiMT7-CL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/54.0.2840.68 Mobile Safari/537.36 qqnews/6.3.1 6.3.1.123";
    it("android system", () => {
        const { name, version, ios, android, manufacture, model, build } = getSystemInfo(ua);
        expect(name).toBe("android");
        expect(version).toBe("6.0");
        expect(ios).toBeFalsy();
        expect(android).toBeTruthy();
        expect(manufacture).toBe("huawei");
        expect(model).toBe("mt7-cl00");
        expect(build).toBe("mt7-cl00");
    });
    it("android browser", () => {
        const { name, version } = getBrowserInfo(ua);
        expect(name).toBe("qqnews");
        expect(version).toBe("6.3.1");
        expect(isNewsApp(ua)).toBeTruthy();
        expect(isLiteNewsApp("qqnewslite/3.10.0")).toBeTruthy();
    });
});

describe("case 4", () => {
    const ua = "Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A523";

    const { name, version, ios, android, manufacture, model, build } = getSystemInfo(ua);
    expect(name).toBe("ipad");
    expect(version).toBe("6.0.1");
    expect(ios).toBeTruthy();
    expect(android).toBeFalsy();
    expect(manufacture).toBe("");
    expect(model).toBe("");
    expect(build).toBe("");
});

describe("case 5", () => {
    const ua =
        "Mozilla/5.0 (Linux; Android 8.1.0; Redmi 6 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 Mobile Safari/537.36 YaApp_Android/10.91 YaSearchBrowser/10.91";
    it("android system", () => {
        const { name, version, ios, android, manufacture, model, build } = getSystemInfo(ua);
        expect(name).toBe("android");
        expect(version).toBe("8.1.0");
        expect(ios).toBeFalsy();
        expect(android).toBeTruthy();
        expect(manufacture).toBe("redmi");
        expect(model).toBe("6");
        expect(build).toBe("o11019");
    });
    it("android browser", () => {
        const { name, version } = getBrowserInfo(ua);
        expect(name).toBe("chrome");
        expect(version).toBe("83.0");
    });
});

describe("case 6", () => {
    it("android system", () => {
        const ua =
            "Mozilla/5.0 (Linux; Android 9; Mi9 Pro 5G Build/PKQ1.190714.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/63.0.3239.83 Mobile Safari/537.36 T7/11.16 SP-engine/2.12.5 baiduboxapp/11.16.5.10 (Baidu; P1 9)";

        const { name, version, ios, android, manufacture, model, build } = getSystemInfo(ua);
        expect(name).toBe("android");
        expect(version).toBe("9");
        expect(ios).toBeFalsy();
        expect(android).toBeTruthy();
        expect(manufacture).toBe("xiaomi");
        expect(model).toBe("mi9 pro 5g");
        expect(build).toBe("pkq1.190714.001");
    });
    it("android browser", () => {
        const ua =
            "Mozilla/5.0 (Linux; Android 9; Mi9 Pro 5G Build/PKQ1.190714.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/63.0.3239.83 Mobile Safari/537.36 T7/11.16 SP-engine/2.12.5 baiduboxapp/11.16.5.10 (Baidu; P1 9)";

        const { name, version } = getBrowserInfo(ua);
        expect(name).toBe("chrome");
        expect(version).toBe("63.0");
    });
    it("", () => {
        const ua =
            "Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36 V1_AND_SQ_8.4.1_1442_YYB_D PA QQ/8.4.1.4680 NetType/WIFI WebP/0.3.0 Pixel/1080 StatusBarHeight/89 SimpleUISwitch/0 QQTheme/1000";

        const browser = getBrowserInfo(ua);
        expect(browser.name).toBe("qq");
        expect(browser.chrome.is).toBeTruthy();
        expect(browser.chrome.version).toBe("77.0");
        expect(browser.mqqbrowser.is).toBeTruthy();
        expect(browser.mqqbrowser.version).toBe("6.2");
        expect(browser.safari.is).toBeTruthy();
        expect(browser.safari.version).toBe("537.36");
        expect(browser.qq.is).toBeTruthy();
        expect(browser.qq.version).toBe("8.4");
    });
});
