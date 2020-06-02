import { setCookie, getCookie, delCookie } from "../src/cookie";

describe("setCookie", () => {
    test("set one cookie", () => {
        setCookie("name", "skeetershi");
        expect(document.cookie).toBe("name=skeetershi");
    });
    test("set some cookie", () => {
        setCookie("age", "24", 2);
        setCookie("browswer", "chrome");
        expect(document.cookie).toBe("name=skeetershi; age=24; browswer=chrome");
    });
});

describe("getCookie", () => {
    test("get one cookie", () => {
        const name = getCookie("name");
        expect(name).toBe("skeetershi");
    });
    test("get one cookie no unescape", () => {
        const name = getCookie("name", true);
        expect(name).toBe("skeetershi");
    });
});

describe("delCookie", () => {
    test("delete one cookie", () => {
        delCookie("name");
        const name = getCookie("name");
        expect(name).toBeNull();
    });
});
