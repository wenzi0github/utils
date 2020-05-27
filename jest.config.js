// https://doc.ebichu.cc/jest/docs/zh-Hans/configuration.html
module.exports = {
    collectCoverage: false,
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
        url: "https://example.org/",
        referrer: "https://example.com/"
    }
};
