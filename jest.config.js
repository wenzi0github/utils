// https://doc.ebichu.cc/jest/docs/zh-Hans/configuration.html

// %stmts是语句覆盖率（statement coverage）：是不是每个语句都执行了？
// %Branch分支覆盖率（branch coverage）：是不是每个if代码块都执行了？
// %Funcs函数覆盖率（function coverage）：是不是每个函数都调用了？
// %Lines行覆盖率（line coverage）：是不是每一行都执行了？

module.exports = {
    collectCoverage: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // setupFiles: ["./__mocks__/localstorage.js", "./__mocks__/editableFn.js"],
    testPathIgnorePatterns: [
        "node_modules", // 默认
        "config",
        "esdocs",
        "docs"
    ],
    coverageDirectory: "coverage",
    // 'setupTestFrameworkScriptFile': '<rootDir>/__test__/setup.js',
    // testEnvironment: "<rootDir>/config/jsdom-env.js",
    testEnvironmentOptions: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        url: "https://example.org/?name=wenzi&age=24#card?articleId=11",
        referrer: "https://example.com/",
        windowOptions: {
            runScripts: "dangerously"
        }
    }
};
