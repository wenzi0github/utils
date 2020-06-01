import { getQueryString } from "../src/url";

describe("getQueryString", () => {
    test("get exist key", () => {
        expect(getQueryString("name")).toBe("wenzi");
        expect(getQueryString("age")).toBe("24");
    });
    test("get not exist key", () => {
        expect(getQueryString("score")).toBeNull();
        expect(getQueryString("tt")).toBeNull();
    });
    test("key is empty or null", () => {
        expect(getQueryString("")).toBeNull();
    });
    test("get exist key from search", () => {
        expect(getQueryString("name", "?name=abcd&age=123")).toBe("abcd");
        expect(getQueryString("age", "?name=abcd&age=123")).toBe("123");
    });
    test("get not exist key from search", () => {
        expect(getQueryString("name", "")).toBeNull();
        expect(getQueryString("age", "")).toBeNull();
    });
});
