import { getQueryString, parse, stringify } from "../src/querystring";

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

describe("parse", () => {
    test("should parse all query queries", () => {
        expect(parse()).toMatchObject({
            name: "wenzi",
            age: "24"
        });
    });
    test("should parse queries from param", () => {
        expect(parse("?name=abcd&age=123")).toMatchObject({
            name: "abcd",
            age: "123"
        });
    });
});

describe("stringify", () => {
    test("stringify obj", () => {
        expect(
            stringify({
                name: "wenzi",
                age: "24"
            })
        ).toBe("name=wenzi&age=24");
    });
    test("stringify sep and eq", () => {
        expect(
            stringify(
                {
                    name: "wenzi",
                    age: "24"
                },
                "|",
                "*"
            )
        ).toBe("name*wenzi|age*24");
    });
    test("stringify encode function", () => {
        expect(
            stringify(
                {
                    a: 10,
                    b: 20
                },
                null,
                null,
                {
                    encode: (value) => {
                        return value * 2;
                    }
                }
            )
        ).toBe("a=20&b=40");
    });
});
