module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: `.env.local.${process.env.NODE_ENV}`,
          blacklist: null,
          whitelist: null,
          safe: true,
          allowUndefined: false,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./components",
            "@hooks": "./hooks",
            "@screens": "./app",
            "@stores": "./stores",
            "@utils": "./utils",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
