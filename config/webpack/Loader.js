import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function loader() {
    
    const scss = {
        test: /\.s[ac]ss$/i,
        use: [
            //devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
        ],
    }
    
    const babel = {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
    
    // const eslint = {
    //     'eslint-loader'
    // }
    
    const loaders = {
        rules: [
            scss,
            babel,
        ]
    }
    
    return loaders
}