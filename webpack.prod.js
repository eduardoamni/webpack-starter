const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CopyPlugin            = require('copy-webpack-plugin');
const CssMinimizerPlugin    = require("css-minimizer-webpack-plugin");
const TerserPlugin    = require("terser-webpack-plugin");


module.exports = {
    mode: 'production',

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

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin(),
          ],
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
            filename: './assets/css/[name].[hash].css',
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