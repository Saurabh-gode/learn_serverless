const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const { neon, neonConfig } = require("@neondatabase/serverless");
const app = express();

const DB_SSM_PARAM = "/serverless-nodejs-api/prod/database-url"
const AWS_REGION = "us-east-1"
const ssm = new AWS.SSM({ region: AWS_REGION })


async function dbclient() {
  neonConfig.fetchConnectionCache = true;
  const paramStoreData = await ssm.getParameter({
    Name: DB_SSM_PARAM,
    WithDecryption: true,
  }).promise();

  const sql = neon(paramStoreData.Parameter.Value)
  return sql;
}

app.get("/", async (req, res, next) => {

  const sql = await dbclient();
  const results = await sql`select now();`

  return res.status(200).json({
    message: "Hello from root!",
    results
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
