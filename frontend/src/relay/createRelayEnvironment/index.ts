import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Logger } from '../../services';
// import getPublicationState from '../../utils/getPublicationState';
import { v4 as uuidv4 } from 'uuid';

const getDataID = (fieldValue: any, typeName: string) => {
    const { documentId, locale, publishedAt } = fieldValue;

    const id = documentId ? documentId : uuidv4();

    const parts = [typeName, id, locale, publishedAt].filter((part) => part);

    if (parts.length === 0) {
        return null;
    }

    return parts.join('_');
};

export const createRelayEnvironment = (records: RecordMap, token?: string, preview = false): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            if (!process.env.API_ENDPOINT) {
                throw new Error('No GraphQL endpoint defined!');
            }
            const vars = { ...variables };

            try {
                const headersObj: any = {
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headersObj.Authorization = `Bearer ${token}`;
                }
                // if (!vars?.publicationState) {
                //     vars.status = getPublicationState(true);
                // }

                const req = await fetch(process.env.API_ENDPOINT, {
                    body: JSON.stringify({ query: operation.text, variables: vars }),
                    headers: headersObj,
                    method: 'POST',
                    cache: 'force-cache',
                });
                const data = await req.json();
                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), vars);
                Logger.error(e);
            }
        }),
        store: new Store(new RecordSource(records)),
        isServer: true,
        getDataID,
    });
