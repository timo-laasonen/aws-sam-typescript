import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { IUser } from '../interfaces/interfaces';
import { ddbDocClient } from '../util/dynamodb';

export const addNew = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    if (!event.body) {
        throw new Error('Empty content not allowed');
    }

    const user: IUser = JSON.parse(event.body);
    const response: PutCommandOutput = await ddbDocClient.send(
        new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: user
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};
