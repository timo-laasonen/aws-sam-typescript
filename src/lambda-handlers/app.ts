import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

interface IUser {
    id: string;
    name: string;
}

const data: IUser[] = [
    {
        id: 'fa5ebb40-d440-430a-93b3-b0a07e5bd63a',
        name: 'User 1'
    },
    {
        id: '06964cfb-1212-4fd7-a80e-d825300f9226',
        name: 'User 2'
    }
];

export const fetchAll = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};

export const findById = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const id = event.pathParameters?.id;
    const user: IUser | undefined = data.find((user) => user.id === id);

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
    data.push(user);

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};
