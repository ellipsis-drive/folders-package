const path = require('path');

module.exports = {
    entry: './src/lib/index.js',
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'build'),
        library: {
            type: 'umd'
        },
        filename: 'ellipsis-folders.js',
    },
    mode: 'production'
};