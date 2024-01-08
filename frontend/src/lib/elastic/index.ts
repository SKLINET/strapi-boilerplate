import { Client } from '@elastic/elasticsearch';
let client: Client | undefined;

export default function getElastic(): Client {
    try {
        if (!client) {
            console.info('Reconnecting elastic');
            client = new Client({
                node: process.env.ELASTIC_URL,
                auth: {
                    apiKey: {
                        id: String(process.env.ELASTIC_API_KEY_ID),
                        api_key: String(process.env.ELASTIC_API_KEY),
                    },
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            console.info('Successfully connected to elastic');
        }
        return client;
    } catch (e) {
        console.error("Can't connect to elastic");
        throw e;
    }
}
