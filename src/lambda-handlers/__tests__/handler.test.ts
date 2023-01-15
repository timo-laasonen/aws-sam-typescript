import { fetchAll } from '../app';
import {APIGatewayProxyEvent, Context} from "aws-lambda";
const event: any = {
    body: JSON.stringify({}),
    headers: {}
};

describe('Lambda handler test', () => {
    test('Should fetch all items', async () => {
        const dummyProxyEvent: Partial<APIGatewayProxyEvent> = {
            headers: { Authorization: "dummyToken" },
            body: JSON.stringify({}),
        };

        const res = await fetchAll(event);
        expect(res.statusCode).toBe(200);
    });
});
