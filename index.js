const express = require("express");
const datastore = require("nedb");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port);
app.use(express.static("public"));
app.use(express.json());
const database = new datastore("database.db");
database.loadDatabase();
const timestamp = Date.now();
app.post("/api", (request, response) => {
  const data = request.body;
  data.timestamp = timestamp;
  database.insert(data);
  response.json({
    status: "Success",
    lat: data.lat,
    log: data.log,
    mood: data.mood,
  });
});
app.get("/api", (request, response) => {
  const data = database.find({}, (err, data) => {
    response.json(data);
  });
});
