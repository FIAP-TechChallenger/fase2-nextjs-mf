const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack(config, options) {
    config.resolve.alias["@libs/db"] = path.join(__dirname, "../../libs/db");

    // Adiciona suporte para TypeScript (caso necessário)
    config.resolve.extensions.push(".ts", ".tsx");

    // Adiciona regra para lidar com arquivos TypeScript
    config.module.rules.push(
      {
        test: /\.tsx?$/, // Aplica a arquivos .ts e .tsx
        exclude: /node_modules/, // Ignora node_modules
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Habilita modo de transpilação apenas
          },
        },
      },
      {
        test: /\.prisma$/,
        use: "raw-loader",
      }
    );

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
