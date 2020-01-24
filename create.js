import uuid from "uuid";
import * as dynamo from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      postId: uuid.v1(),
      createdAt: Date.now(),
      userId: event.requestContext.identity.cognitoIdentityId,
      title: data.title,
      type: "blog",
      body: data.body
    }
  };

  try {
    await dynamo.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
