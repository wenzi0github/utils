import { getQueryString, strReplace, truncate } from "../src/string";

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

describe("strReplace", () => {
    let str = "hello, my name is {name}, my age is {age}";
    test("replace all", () => {
        expect(
            strReplace(str, {
                name: "wenzi",
                age: 24
            })
        ).toBe("hello, my name is wenzi, my age is 24");
    });
    test("some key not exist", () => {
        expect(
            strReplace(str, {
                name: "wenzi"
            })
        ).toBe("hello, my name is wenzi, my age is {age}");
    });
});

describe("truncate", () => {
    test("string length less then truncate size", () => {
        expect(truncate("hello world", 20)).toBe("hello world");
        expect(truncate("hello world", 12)).toBe("hello world");
    });
    test("string length equal truncate size", () => {
        expect(truncate("hello world", 11)).toBe("hello world");
    });
    test("string length more then truncate size", () => {
        expect(truncate("hello world", 4)).toBe("hell...");
        expect(truncate("hello world", 5)).toBe("hello...");
    });
    test("truncate size less then 0", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("hello world", 0)).toBe("hello world");
        expect(truncate("hello world", -3)).toBe("hello world");
        expect(truncate("hello world", -4)).toBe("hello world");
    });
    test("anothor tail", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("hello world", 4, "***")).toBe("hell***");
    });
    test("anothor tail", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("hello world", 20, "***")).toBe("hello world");
    });
    test("string has some spaces in first", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("  hello world", 4)).toBe("hell...");
    });
    test("string has some spaces in end", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("hello world  ", 4)).toBe("hell...");
    });
    test("string has some spaces in first and end", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("  hello world  ", 4)).toBe("hell...");
    });
    test("string is empty", () => {
        // 字符串的长度等于要截取的长度
        expect(truncate("", 4)).toBe("");
    });
});
