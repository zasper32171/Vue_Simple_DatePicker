/* eslint-disable no-param-reassign */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/datepicker/' : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Simple DatePicker';
      return args;
    });
  },
};
