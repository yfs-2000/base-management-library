const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const WebpackBar = require("webpackbar");
const CracoAlias = require("craco-alias");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CracoLessPlugin = require("craco-less");
const loaderUtils = require("loader-utils");
const path = require("path");
const lessModifyVars = {};
const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  webpack: {
    plugins: {
      add: [
        ...whenProd(
          () => [
            new BundleAnalyzerPlugin(),
            new SimpleProgressWebpackPlugin(), // 查看打包的进度
            new WebpackBar({
              profile: true,
            }),
          ],
          []
        ),
      ],
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.optimization.minimizer[0].options.compress = {
        drop_console: isEnvProduction,
      };
      return webpackConfig;
      // webpackConfig.optimization.minimizer[minimizerIndex].options.terserOptions.compress.drop_console = isEnvProduction
      // return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        // see in examples section
        aliases: {
          src: "./src", //变量别名
        },
      },
    },
    /*  {
          plugin: sassResourcesLoader, //less  sass 的自定义变量引入每个文件
          options: {
              resources: "./src/common/css/theme.scss",
          },
      },*/
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#00a9eb",
              "@link-color": "#00a9eb", // 链接色
              "@border-radius-base": "0px",
              "@border-color-base": "#dfe4e7",
              "@text-color": "#666666", // 主文本色
              "@heading-color": "#333333", // 标题色
              "@btn-height-base": "30px", // 按钮高度
              "@btn-padding-horizontal-base": "20px", //按钮的左右边距
              "@modal-header-paddin": "9px 20px",
              "@modal-footer-border-width": "0px",
              "@modal-footer-padding-horizontal": "10px",
              "@table-header-bg": "#ffffff",
              "@table-selected-row-bg": "#eef5f9",
              "@table-body-sort-bg": "#ffffff",
              "@modal-header-padding-vertical": "10px",
              "@modal-header-padding-horizontal": "20px",
              "@modal-body-padding": "20px 20px 0 20px",
              "@select-item-selected-bg": "#eef5f9", //下拉的选中后的背景
              "@table-row-hover-bg": "#eef5f9", //table hover颜色
              "@menu-icon-size": "16px", //菜单的icon大小
              "@menu-icon-size-lg": "16px", //菜单的展开icon大小
              "@table-selection-column-width": "50px", //table的选择框
              "@btn-primary-shadow": "none", //按钮底部的阴影
            },
            javascriptEnabled: true,
          },
        },
        /*css module的配置 区分less 和 module.less*/
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.less$/;
          lessRule.exclude = /\.module\.less$/;
          return lessRule;
        },
      },
    },
    /*css module的配置*/
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: lessModifyVars,
            javascriptEnabled: true,
          },
        },
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.module\.less$/;
          lessRule.exclude = undefined;
          return lessRule;
        },
        cssLoaderOptions: {
          modules: {
            getLocalIdent: getLocalIdent, //这个是react官方的  less文件名 加 类目  再加 hash
            //   localIdentName: '[local]_[hash:base64:5]',//原配置 但现在不用这个  这个就是类名加hash
          },
        },
      },
    },
  ],
};
function getLocalIdent(context, localIdentName, localName, options) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.less$/)
    ? "[folder]"
    : "[name]";
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    "md5",
    "base64",
    5
  );
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + "_" + localName + "__" + hash,
    options
  );
  // remove the .module that appears in every classname when based on the file.
  return className.replace(".module_", "_");
}
