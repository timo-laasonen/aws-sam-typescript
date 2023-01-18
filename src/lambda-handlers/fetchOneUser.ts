import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetCommand, GetCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../util/dynamodb';

export const findById = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const id = event.pathParameters?.id;
    const user: GetCommandOutput = await ddbDocClient.send(
        new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                id
            }
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify(user.Item)
    };
};
