# Electrode Static Paths

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

Electrode Server Decor to serve static files using [inert].

## Usage

Install

```
$ npm i electrode-static-paths --save
```

```js
const electrodeServer = require("electrode-server");

electrodeServer( config, [require("electrode-static-paths")()] );
```

## Static Files

By default, the static files are served from `dist` under CWD.

  * Route `/html` will serve files from `dist/html`
  * Route `/js` will serve files from `dist/js`
  * Route `/images` will serve files from `dist/images`

### Route and Path prefixes

You can change the prefix `dist` with `pathPrefix` in options to the `electrodeStaticPaths` plugin.

You can add a route prefix with `routePrefix` option.

For example:

```js
const config = {
  plugins: {
    electrodeStaticPaths: {
      options: {
        routePrefix: "/test",
        pathPrefix: "myfiles"
      }
    }
  }
};
```

### Routes

You can override the `/html`, `/js`, and `/images` routes with `routes` option.

For example, if you only want to serve files at `/js`, then:

```js
{
  plugins: {
    electrodeStaticPaths: {
      options: {
        routes: [ "js" ]
      }
    }
  }
}
```

### Route config

You can also specify configs to be passed to `server.route`:

```js
const config = {
  plugins: {
    electrodeStaticPaths: {
      options: {
        config: {
        }
      }
    }
  }
};
```

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[inert]: https://github.com/hapijs/inert
[npm-image]: https://badge.fury.io/js/electrode-static-paths.svg
[npm-url]: https://npmjs.org/package/electrode-static-paths
[travis-image]: https://travis-ci.org/electrode-io/electrode-static-paths.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/electrode-static-paths
[daviddm-image]: https://david-dm.org/electrode-io/electrode-static-paths.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/electrode-io/electrode-static-paths
