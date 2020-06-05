import { parse, stringify, format } from "../src/url";

// https://example.org/?name=wenzi&age=24#card?articleId=11

describe("parse", () => {
    test("should parse url in location.href", () => {
        const result = parse();
        expect(result.href).toBe("https://example.org/?name=wenzi&age=24#card?articleId=11");
        expect(result.hostname).toBe("example.org");
        expect(result.search).toBe("?name=wenzi&age=24");
    });
    test("should parse url from param", () => {
        const url = "https://www.xiabingbao.com/?from=utils";
        const result = parse(url);
        expect(result.href).toBe(url);
        expect(result.hostname).toBe("www.xiabingbao.com");
        expect(result.search).toBe("?from=utils");
    });
});

describe("stringify", () => {
    test("stringify hostname and pathname", () => {
        expect(
            stringify({
                hostname: "www.xiabingbao.com",
                pathname: "/post/fe/hash-history-router.html"
            })
        ).toBe("https://www.xiabingbao.com/post/fe/hash-history-router.html");
    });
    test("stringify protocol and port", () => {
        expect(
            stringify({
                protocol: "http:",
                port: "8080",
                hostname: "www.xiabingbao.com",
                pathname: "/post/fe/hash-history-router.html"
            })
        ).toBe("http://www.xiabingbao.com:8080/post/fe/hash-history-router.html");
    });
    test("stringify query", () => {
        expect(
            stringify({
                hostname: "www.xiabingbao.com",
                query: {
                    from: "utils",
                    num: 1,
                    score: {
                        math: 80,
                        eng: 90
                    }
                }
            })
        ).toBe("https://www.xiabingbao.com?from=utils&num=1&score=%7B%22math%22%3A80%2C%22eng%22%3A90%7D");
    });
});

describe("format", () => {
    test("format hostname and pathname", () => {
        expect(
            format({
                hostname: "www.xiabingbao.com",
                pathname: "/post/fe/hash-history-router.html"
            })
        ).toBe("https://www.xiabingbao.com/post/fe/hash-history-router.html");
    });
    test("format protocol and port", () => {
        expect(
            format({
                protocol: "http:",
                port: "8080",
                hostname: "www.xiabingbao.com",
                pathname: "/post/fe/hash-history-router.html"
            })
        ).toBe("http://www.xiabingbao.com:8080/post/fe/hash-history-router.html");
    });
    test("format query", () => {
        expect(
            format({
                hostname: "www.xiabingbao.com",
                query: {
                    from: "utils",
                    num: 1,
                    score: {
                        math: 80,
                        eng: 90
                    }
                }
            })
        ).toBe("https://www.xiabingbao.com?from=utils&num=1&score=%7B%22math%22%3A80%2C%22eng%22%3A90%7D");
    });
});
