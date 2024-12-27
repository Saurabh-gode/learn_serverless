const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const DB_SSM_PARAM = "/serverless-nodejs-api/prod/database-url"
const AWS_REGION = "us-east-1"

async function getDbUrl() {
    const client = new SSMClient({ region: AWS_REGION });

    const params = {
        Name: DB_SSM_PARAM,
        WithDecryption: true,
    }
    const command = new GetParameterCommand(params)
    const result = await client.send(command);

    return result.Parameter.Value
}

module.exports = {
    getDbUrl
}
