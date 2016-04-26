module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js', // 这是默认的文件名
        // 在这个文件夹下我们的 bundle 文件将可用a
        // 当启动 webpack-dev-server 时，确保 8090 端口可以被使用
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [
            {
                // 告诉 webpack 使用 jsx-loader 来解析所有的 *.jsx 文件
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    externals: {
        // don't bundle the 'react' npm package with our bundle.js
        // but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}

