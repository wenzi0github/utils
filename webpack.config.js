const path = require("path");

// https://webpack.docschina.org/configuration
module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryExport: "default",
        library: "User",
        libraryTarget: "umd",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
};
