import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client: DynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });
export const ddbDocClient: DynamoDBDocumentClient =
    DynamoDBDocumentClient.from(client);
