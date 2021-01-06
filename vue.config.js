const path = require('path');

module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule.test(/\.svg$/)
            .include
            .add(path.resolve(__dirname, './src/assets/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]',
            });

        const fileRule = config.module.rule('file');

        fileRule.uses.clear();

        fileRule.test(/\.svg$/)
            .exclude
            .add(path.resolve(__dirname, './src/assets/icons/svg'))
            .end()
            .use('file-loader')
            .loader('file-loader');
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/styles/_variables.scss";',
            },
        },
        sourceMap: true
    },
};