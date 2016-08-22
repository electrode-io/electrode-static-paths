"use strict";

const path = require("path");

module.exports = function () {
  return {
    plugins: {
      inert: {
        priority: 100,
        options: {}
      },

      electrodeStaticPaths: {
        priority: 120,
        module: path.join(__dirname, `./plugin-static-paths.js`),
        options: {
          pathPrefix: "dist",
          config: {}
        }
      }
    }
  };
};
