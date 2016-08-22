# Electrode Static Paths

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
  
You can change the prefix `dist` with options to the `electrodeStaticPaths` plugin:

```js
const config = {
  plugins: {
    electrodeStaticPaths: {
      options: {
        pathPrefix: "myfiles"
      }
    }
  }
};
```

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

[inert]: https://github.com/hapijs/inert
