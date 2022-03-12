const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CopyPlugin            = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',

    output:{
        clean:true,
        filename:'./assets/js/main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/, // llaves del 7 son como abrir cerrar comillas, el dolar es para que busque todos los archivos
                loader: "html-loader",
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/, // llaves del "7" son como abrir cerrar comillas, el dolar es para que busque todos los archivos
                exclude: /styles.css$/,
                use: [ "style-loader", "css-loader" ]
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ],
    },

    optimization: {

    },

    plugins:  [
        new HtmlWebPackPlugin({
            title: 'Mi webpackApp',
            //filename: 'index.html' por defecto le pone index.html
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            //se le puede meter un hash
            // filename: 'assets/css/[name].[fullhash].css',
            filename: './assets/css/[name].css',
            ignoreOrder: false

        }),

        new CopyPlugin ({
            patterns:[
                {
                    from: './src/assets/', 
                    to:'./assets/',
                    globOptions: {
                        ignore:[
                            '**/css/styles.css',
                        ]
                    }
                }
            ],

        })
    ],
}