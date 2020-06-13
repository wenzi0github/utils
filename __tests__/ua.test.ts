import { getSystemInfo } from "../src/ua";

describe("", () => {
    const ua = "Mozilla/5.0 (iPod; CPU iPhone OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25";
    it("ios", () => {
        console.log(getSystemInfo(ua));
    });
});
