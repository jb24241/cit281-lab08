// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require('fastify')();

// #2 TODO: Declare fetch object from node-fetch
const fetch = require('node-fetch');

fastify.get("/photos", (request, reply) => {
  // #3 TODO:
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(photos => {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "", statusCode: 200, photos });
    })
    .catch(error => {
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: error.message, statusCode: 404, photos: [] });
    });
});

fastify.get("/photos/:id", (request, reply) => {
  // #4 TODO:
  const { id = "" } = request.params;

  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(response => response.json())
    .then(photo => {
      if (Object.keys(photo).length === 0) {
        reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: "Invalid ID", statusCode: 404, photo: {} });
      } else {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: "", statusCode: 200, photo });
      }
    })
    .catch(error => {
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: error.message, statusCode: 404, photo: {} });
    });
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});