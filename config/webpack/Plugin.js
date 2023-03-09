import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { fileURLToPath } from 'url'
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export function plugin(isDev, filenameCss) {
    
    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../../public/index.html"),
            minify: {
                removeComments: !isDev,
                collapseWhitespace: !isDev
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../../src/assets/favicon.ico"),
                    to: path.resolve(__dirname, "../../dist"),
                },
            ],
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: filenameCss,
            chunkFilename: filenameCss
        })
    ]
    
    return plugins
}