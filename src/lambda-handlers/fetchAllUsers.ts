import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ScanCommand, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../util/dynamodb';

export const fetchAll = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    const allUsers: ScanCommandOutput = await ddbDocClient.send(
        new ScanCommand({
            TableName: process.env.TABLE_NAME
        })
    );

    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    return {
        statusCode: 200,
        body: JSON.stringify(allUsers.Items)
    };
};
