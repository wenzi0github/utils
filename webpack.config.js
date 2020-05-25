const path = require("path");
const webpack = require('webpack');

const packageConfig = require( './package' );

// https://webpack.docschina.org/configuration
module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.ts",
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
    plugins: [new webpack.BannerPlugin(`User v${packageConfig.version}\nlast update: ${new Date().toLocaleString()}\nauthor: skeetershi`)],
};
