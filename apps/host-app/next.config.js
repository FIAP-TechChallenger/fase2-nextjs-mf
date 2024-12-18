const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack(config, options) {
    config.resolve.alias["@libs/db"] = path.join(__dirname, "../../libs/db");

    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
            remote: "remote@http://localhost:3001/remote.js",
          },
          filename: "static/chunks/remoteEntry.js",
        })
      );
    }
    return config;
  },
};
