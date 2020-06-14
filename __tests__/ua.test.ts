import { getSystemInfo, getBrowserInfo } from "../src/ua";

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
