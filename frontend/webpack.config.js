import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default function (env, argv) {
    let cache = false;
    if (argv.mode === 'development') {
        cache = {
            type: 'filesystem',
        };
    }

    return {
        entry: {
            index: './index.jsx',
        },
        output: {
            filename: argv.mode === 'development' ? '[name].js' : '[name].[contenthash].js',
            path: path.resolve('..', 'partners_list', 'static'),
            clean: true,
            publicPath: '/static/',
        },
        module: {
            rules: [
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-react']],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: path.resolve('..', 'partners_list', 'templates', 'index.html'),
                inject: 'head',
                title: 'C4C Partners List',
                scriptLoading: 'module',
            }),
        ],
        cache: cache,
    };
}
