import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      postId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamodb.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found" });
    }
  } catch(e) {
    console.log(e);
    return failure({ status: false });
  }
}
