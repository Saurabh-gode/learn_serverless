
const { neon } = require("@neondatabase/serverless");
const secrets = require("../lib/secrets");

async function getDbclient() {
    const dburl = await secrets.getDbUrl();
    const sql = neon(dburl)
    return sql;
}

module.exports = {
    getDbclient
}

