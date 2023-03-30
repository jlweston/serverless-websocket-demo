import { DynamoDB } from "aws-sdk";

const ddb = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: process.env.AWS_REGION,
});

export async function handler(event) {
  try {
    console.log({ event });
    const putParams = {
      TableName: process.env.TABLE_NAME as string,
      Item: {
        connectionId: event.requestContext.connectionId,
      },
    };
    await ddb.put(putParams).promise();
  } catch (err) {
    console.log({ ...err });
    return {
      statusCode: 500,
      body: "Failed to connect: " + JSON.stringify(err),
    };
  }

  return { statusCode: 200, body: "Connected." };
}
