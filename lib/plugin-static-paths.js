"use strict";

/* eslint-disable no-unused-expressions */

const Path = require("path");
const Chalk = require("chalk");
const _ = require("lodash");
const assert = require("assert");
//
// Hapi plugin to serve static files from directories
// js, images, and html under ${options.pathPrefix}.
//

const after = options => (server, next) => {
  options = _.defaultTo(options, {});
  const routePrefix = _.get(options, "routePrefix", "");
  const pathPrefix = _.get(options, "pathPrefix", "");
  const routes = _.get(options, "routes", ["js", "images", "html", "map"]);

  if (options.verbose === true || options.quiet === false) {
    const msg =
      `staticPaths Plugin: static files route prefix "${routePrefix}"` +
      ` path prefix "${pathPrefix}" at routes ${routes}`;
    console.log(Chalk.inverse.green(msg)); // eslint-disable-line
  }

  const config = _.merge({}, options.config);
  const connections = options.connections || "default";
  // istanbul ignore next
  const connection = (server.select && server.select(connections)) || server;

  assert(connection, `staticPaths Plugin can't find connection ${connections} on server.`);

  _.each(routes, route => {
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

  // istanbul ignore next
  next && next();
};

function hapi16(server, options, next) {
  server.dependency("inert", after(options));
  // istanbul ignore next
  next && next();
}

const pkg = require("../package.json");

const { universalHapiPlugin } = require("electrode-hapi-compat");

module.exports = universalHapiPlugin(
  {
    hapi16,
    hapi17: hapi16
  },
  pkg
);
