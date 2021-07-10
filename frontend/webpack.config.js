const webpack = require("@nativescript/webpack");
const {resolve} = require('path')

module.exports = (env) => {
    webpack.init(env);

    webpack.Utils.addCopyRule(
        {from: resolve(__dirname, "src/assets/**")}
    )

    return webpack.resolveConfig();
};


