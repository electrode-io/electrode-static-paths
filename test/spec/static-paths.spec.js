"use strict";
const electrodeServer = require("electrode-server");
const sa = require("superagent");
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const _ = require("lodash");

describe("static-paths", function () {

  function test(quiet, pathPrefix) {
    let server;
    const verifyServerStatic = (s) => {
      server = s;
      return Promise.resolve()
        .then(() => sa.get("http://localhost:3000/html/hello.html")
          .then((resp) => {
            assert(resp, "Server didn't return response");
            assert(_.includes(resp.text, "Hello Test!"),
              "response not contain expected string");
          }))
        .then(() => sa.get("http://localhost:3000/images/hello.svg")
          .then((resp) => {
            expect(resp.statusCode).to.equal(200);
            expect(resp.type).to.equal("image/svg+xml");
            const body = resp.body.toString();
            expect(body).to.equal(`<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />\n`);
          }))
        .then(() => sa.get("http://localhost:3000/js/hello.js")
          .then((resp) => {
            expect(resp.statusCode).to.equal(200);
            expect(resp.type).to.equal("application/javascript");
          }));
    };

    const config = {
      plugins: {
        electrodeStaticPaths: {
          options: {
            quiet,
            pathPrefix
          }
        }
      }
    };

    return electrodeServer(config, [require("../..")()])
      .then(verifyServerStatic)
      .finally(() => server && server.stop());
  }

  it("should return static file", () => test(undefined, "test/dist"));

  it("should return static file", () => test(true, "test/dist"));

});
