import path from 'path'
import { fileURLToPath } from 'url'
import { plugin } from './config/webpack/Plugin.js'
import { loader } from './config/webpack/Loader.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filenameCss = () => !isDev ? 'css/[name].[contenthash:5].css' : 'css/[name].css'
const filenameJs = () => !isDev ? "bundle.[hash].js" : 'bundle.js'

export default {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3005,
        hot: isDev
    },
    output: {
        filename: filenameJs,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    plugins: plugin(isDev, filenameCss),
    module: loader()
}