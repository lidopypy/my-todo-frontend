//antd 高級配置，按需引入使用該文件
const { override, fixBabelImports } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  })
);
