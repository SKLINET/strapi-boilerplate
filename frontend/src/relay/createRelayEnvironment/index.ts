import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Logger } from '../../services';

export const createRelayEnvironment = (records: RecordMap): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            if (!process.env.API_ENDPOINT) {
                throw new Error('No GraphQL endpoint defined!');
            }

            try {
                const { data } = await axios(process.env.API_ENDPOINT, {
                    data: JSON.stringify({ query: operation.text, variables }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    responseType: 'json',
                });
                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), variables);
                Logger.error(e);
            }
        }),
        store: new Store(new RecordSource(records)),
        isServer: true,
    });
