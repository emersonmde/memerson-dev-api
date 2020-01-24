import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    IndexName: process.env.listIndexName,
    KeyConditionExpression: "#tp = :tp",
    ExpressionAttributeNames: {
      "#tp": "type"
    },
    ExpressionAttributeValues: {
      ":tp": "blog"
    }
  };

  try {
    const result = await dynamodb.call("query", params);
    return success(result.Items);
  } catch(e) {
    console.log(e);
    return failure({ status: false });
  }
}
