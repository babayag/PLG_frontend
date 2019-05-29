// babel.config.js
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  };

  //"test": "react-scripts test",
  //https://jestjs.io/docs/en/configuration.html