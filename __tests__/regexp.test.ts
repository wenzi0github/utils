import { isUrl, isPhone, isEmail } from "../src/regexp";

describe("isUrl", () => {
    test("should be right, http://", () => {
        expect(isUrl("http://www.example.com")).toBeTruthy();
    });
    test("should be right, location.href", () => {
        // https://example.org/?name=wenzi&age=24#card?articleId=11
        expect(isUrl(window.location.href)).toBeTruthy();
    });
    test("should be right, file://", () => {
        expect(isUrl("file://usr/b.txt")).toBeTruthy();
    });
    test("should be false, ://", () => {
        expect(isUrl("://example.com")).toBeFalsy();
    });
    test("should be false, //", () => {
        expect(isUrl("//example.com")).toBeFalsy();
    });
    test("should be false, ", () => {
        expect(isUrl("www.example.com")).toBeFalsy();
    });
});

describe("isPhone", () => {
    test("shold be right", () => {
        expect(isPhone("13012345678")).toBeTruthy();
    });
    test("shold be false, length more then 11", () => {
        expect(isPhone("130123456789")).toBeFalsy();
    });
    test("shold be false, length less then 11", () => {
        expect(isPhone("1301234567")).toBeFalsy();
    });
    test("shold be true, start 1", () => {
        expect(isPhone("12012345678")).toBeTruthy();
    });
    test("shold be false, has not number", () => {
        expect(isPhone("13012a45678")).toBeFalsy();
    });
    test("shold be false, str is empty", () => {
        expect(isPhone("")).toBeFalsy();
    });
});

describe("isEmail", () => {
    test("should be right", () => {
        expect(isEmail("123456@qq.com")).toBeTruthy();
        expect(isEmail("123456@google.com")).toBeTruthy();
        expect(isEmail("123456@gmail.go.com")).toBeTruthy();
    });
    test("shold be false", () => {
        expect(isEmail("123456abc")).toBeFalsy();
        expect(isEmail("@gmail.com")).toBeFalsy();
        expect(isEmail("123456abc.com")).toBeFalsy();
    })
})