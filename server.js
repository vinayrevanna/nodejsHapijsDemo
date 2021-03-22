"use strict";

const Hapi = require("@hapi/hapi");


const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 1234,
  });

  //to use plugins
  await server.register([
      require('hapi-geo-locate'),
  ])

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (req, h) => {
        return "<h1> Hello from Hapi js</h1>";
      },
    },
    {
      method: "GET",
      path: "/users/{user?}", // user? not mandatory
      handler: (req, h) => {
        if (req.params.user) {
          return `<h1> Hello ${req.params.user}</h1>`;
        } else {
          return `<h1> Hello Someone!</h1>`;
        }
      },
    },
    {
      method: "GET",
      path: "/user", // user? not mandatory
      handler: (req, h) => {
        if (req.query.fname && req.query.lname)
          return `<h1> Hello ${req.query.fname}  ${req.query.lname}</h1>`;
        else return h.redirect("/");
      },
    },
    {
      method: "GET",
      path: "/{any*}", // user? not mandatory
      handler: (req, h) => {
        return "<h1> some thing wentwrong!";
      },
    },
  ]);

  await server.start();
  console.log(`Server started on : ${server.info.uri}`);
};

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});
init();
