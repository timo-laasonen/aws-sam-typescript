import {fetchAll, IUser} from '../app';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {mockClient} from 'aws-sdk-client-mock';
import {DynamoDBDocumentClient, ScanCommand} from '@aws-sdk/lib-dynamodb';

const event: any = {
    body: JSON.stringify({}),
    headers: {}
};

describe('Lambda handler test', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    test('Should fetch all items', async () => {
        const items: IUser[] = [
            { id: 'id1', name: 'User 1', created: new Date() },
            { id: 'id2', name: 'User 2', created: new Date() }
        ];

        // Return the specified value whenever the spied scan function is called
        ddbMock.on(ScanCommand).resolves({
            Items: items,
        });

        const res: APIGatewayProxyResult = await fetchAll(event);
        expect(res.statusCode).toBe(200);
    });
});
