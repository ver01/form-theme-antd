const path = require("path");
const webpack = require("webpack");
// // const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    cache: true,
    context: __dirname + "/src",
    entry: ["./index.js", "./index.scss"],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "index.js",
        libraryTarget: "umd",
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "production",
            },
        }),
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devtool: "source-map",
    externals: {
        react: {
            root: "React",
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            umd: "react",
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom",
            umd: "react-dom",
        },
        antd: {
            root: "Antd",
            commonjs: "antd",
            commonjs2: "antd",
            amd: "antd",
            umd: "antd",
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        },
                    },
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: ["node_modules"],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")],
    },
};
