"use strict";

const Path = require("path");
const Chalk = require("chalk");
const _ = require("lodash");
const assert = require("assert");
//
// Hapi plugin to serve static files from directories
// js, images, and html under ${options.pathPrefix}.
//

const after = (options) => (server, next) => {
  options = _.defaultTo(options, {});
  const routePrefix = _.get(options, "routePrefix", "");
  const pathPrefix = _.get(options, "pathPrefix", "");
  const routes = _.get(options, "routes", ["js", "images", "html"]);

  if (!options.quiet) {
    const msg = `staticPaths Plugin: static files route prefix "${routePrefix}"` +
      ` path prefix "${pathPrefix}" at routes ${routes}`;
    console.log(Chalk.inverse.green(msg)); // eslint-disable-line
  }

  const config = _.merge({}, options.config);
  const connections = options.connections || "default";
  const connection = server.select(connections);

  assert(connection, `staticPaths Plugin can't find connection ${connections} on server.`);

  _.each(routes, (route) => {
    connection.route({
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

  next();
};


const StaticPaths = (server, options, next) => {
  server.dependency("inert", after(options));
  next();
};

StaticPaths.attributes = {
  pkg: {
    name: "electrodeStaticPaths",
    version: "1.0.0"
  }
};

module.exports = StaticPaths;
