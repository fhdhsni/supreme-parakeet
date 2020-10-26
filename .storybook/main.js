module.exports = {
  stories: [
    "../packages/**/*.example.mdx",
    "../packages/**/*.example.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.module.rules = [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
          },
          {
            loader: "react-docgen-typescript-loader",
            options: {},
          },
        ],
      },
    ];

    return config;
  },
};
