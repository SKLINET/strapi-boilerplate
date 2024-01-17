import axios, { AxiosRequestConfig } from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Logger } from '../../services';
// import getPublicationState from '../../utils/getPublicationState';

export const createRelayEnvironment = (records: RecordMap, token?: string, preview = false): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            if (!process.env.API_ENDPOINT) {
                throw new Error('No GraphQL endpoint defined!');
            }
            const vars = { ...variables };

            try {
                const headersObj: AxiosRequestConfig['headers'] = {
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headersObj.Authorization = `Bearer ${token}`;
                }
                // if (!vars?.publicationState) {
                //     vars.publicationState = getPublicationState(true);
                // }

                const { data } = await axios(process.env.API_ENDPOINT, {
                    data: JSON.stringify({ query: operation.text, variables: vars }),
                    headers: headersObj,
                    method: 'POST',
                    responseType: 'json',
                });
                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), vars);
                Logger.error(e);
            }
        }),
        store: new Store(new RecordSource(records)),
        isServer: true,
    });
