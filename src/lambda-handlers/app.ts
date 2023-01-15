import { APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent) => {
    console.info('incoming event is', JSON.stringify(event));
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Request was successful. Yeah' })
    };
};
