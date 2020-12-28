const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");

const packageConfig = require("./package");

const getFileEntry = () => {
    const list = fs.readdirSync(path.resolve(__dirname, "src"));
    let result = {};
    list.forEach((item) => {
        const { ext, name } = path.parse(item);
        if (ext === ".ts") {
            result[name] = path.resolve(__dirname, "src", item);
        }
    });
    return result;
};

// https://webpack.docschina.org/configuration
module.exports = {
    mode: "production",
    entry: getFileEntry(),
    output: {
        path: path.resolve(__dirname),
        filename: "[name].js",
        libraryExport: "[name]" === "visibility" ? "default" : undefined,
        library: "[name]",
        libraryTarget: "umd",
        globalObject: "this" // fixed by https://github.com/wenzi0github/npm-webpack-ts/issues/2
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    plugins: [new webpack.BannerPlugin(`gh-qqnews-utils/[name] v${packageConfig.version} @: ${new Date().toLocaleString()}`)]
};
