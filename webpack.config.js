const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

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
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryExport: "[name]" === "visibility" ? "default" : undefined,
        library: "[name]",
        libraryTarget: "umd"
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
    plugins: [new webpack.BannerPlugin(`gh-qqnews-utils/[name] v${packageConfig.version}\nlast update: ${new Date().toLocaleString()}\nauthor: skeetershi`)]
};
