const path = require("path");

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: "warning",
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", path.resolve(__dirname, "./src"));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 生产环境
      config.mode = "production";
    } else {
      // 开发环境
      config.mode = "development";
    }
  },
  // css相关配置
  //   css: {
  //     // 是否分离css（插件ExtractTextPlugin）
  //     extract: true,
  //     // 是否开启 CSS source maps
  //     sourceMap: false,
  //     // css预设器配置项
  //     loaderOptions: {},
  //     // 是否启用 CSS modules for all css / pre-processor files.
  //     modules: false
  //   },
  // 是否使用 thread-loader
  // parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: true,
    // host: 'localhost',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // // http 代理配置
    proxy: {
      // 以api开头的域名解决跨域的问题
      "/api": {
        target: "http://120.53.31.103:84/api/app", //besUrl地址
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    //     before: (app) => {}
  },
  // 第三方插件配置
  pluginOptions: {},

  devServer: {
    port: 8080,
    open: true,
    proxy: {
      "/api": {
        //请求源地址
        target: "http://admintest.happymmall.com",
        //是否跨域
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
