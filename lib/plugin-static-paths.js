"use strict";
/* eslint-disable arrow-parens */

const Path = require("path");
const Chalk = require("chalk");
const _ = require("lodash");
//
// Hapi plugin to serve static files from directories
// js, images, and html under ${options.pathPrefix}.
//

const after = options => server => {
  options = _.defaultTo(options, {});
  const routePrefix = _.get(options, "routePrefix", "");
  const pathPrefix = _.get(options, "pathPrefix", "");
  const routes = _.get(options, "routes", ["js", "images", "html"]);

  if (!options.quiet) {
    const msg =
      `staticPaths Plugin: static files route prefix "${routePrefix}"` +
      ` path prefix "${pathPrefix}" at routes ${routes}`;
    console.log(Chalk.inverse.green(msg)); // eslint-disable-line
  }

  const config = _.merge({}, options.config);

  _.each(routes, route => {
    server.route({
      method: "GET",
      path: `${routePrefix}/${route}/{param*}`,
      handler: {
        directory: {
          path: Path.join(pathPrefix, route)
        }
      },
      config
    });
  });

  return;
};

const StaticPaths = (server, options) => {
  server.dependency("inert", after(options));
};

const pkg = {
  name: "electrodeStaticPaths",
  version: "1.0.0"
};

module.exports = {
  register: StaticPaths,
  pkg
};
