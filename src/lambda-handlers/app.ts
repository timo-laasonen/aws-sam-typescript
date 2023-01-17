import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    GetCommand,
    GetCommandOutput,
    PutCommand,
    PutCommandOutput,
    ScanCommand,
    ScanCommandOutput
} from '@aws-sdk/lib-dynamodb';

const client: DynamoDBClient = new DynamoDBClient({});
const ddbDocClient: DynamoDBDocumentClient =
    DynamoDBDocumentClient.from(client);

export interface IUser {
    id: string;
    name: string;
    created: Date;
}

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_NAME;

export const fetchAll = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const allUsers: ScanCommandOutput = await ddbDocClient.send(
        new ScanCommand({
            TableName: tableName
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify(allUsers.Items)
    };
};

export const findById = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const id = event.pathParameters?.id;
    const user: GetCommandOutput = await ddbDocClient.send(
        new GetCommand({
            TableName: tableName,
            Key: {
                id
            }
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};

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
            TableName: tableName,
            Item: user
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};
