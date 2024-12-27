const serverless = require("serverless-http");
const express = require("express");
const { getDbclient } = require("./db/clients");
const app = express();


app.get("/", async (req, res, next) => {

  const sql = await getDbclient();

  const now = Date.now()
  const [dbResultnow] = await sql`select now();`
  const delta = (dbResultnow.now.getTime() - now) / 1000;

  return res.status(200).json({
    message: "Hello from root!",
    delta
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// // server-full app
// app.listen(3000, () => {
//   console.log("running at port 3000")
// })

exports.handler = serverless(app);
