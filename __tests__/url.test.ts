import { getQueryString, queryParse } from "../src/url";

// https://example.org/?name=wenzi&age=24#card?articleId=11

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

describe("queryParse", () => {
    test("should get all query queries", () => {
        expect(queryParse()).toMatchObject({
            name: "wenzi",
            age: "24"
        });
    });
    test("should get queries from param", () => {
        expect(queryParse("?name=abcd&age=123")).toMatchObject({
            name: "abcd",
            age: "123"
        });
    });
});
