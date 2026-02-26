import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Logger } from '../../services';

const getDataID = (fieldValue: any, typeName: string) => {
    const { documentId, id, locale, publishedAt, updatedAt } = fieldValue;

    const _id = documentId ? documentId : id ? id : undefined;

    const parts = [typeName, _id, locale, publishedAt, updatedAt].filter((part) => part);
    if (parts.length === 0) {
        return null;
    }

    return parts.join('_');
};

class CustomRecordSource extends RecordSource {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    get(recordID: string) {
        const record = super.get(recordID);
        if (record && record.__typename && record.id) {
            return {
                ...record,
                id: getDataID(record, String(record.__typename)),
            };
        }
        return record;
    }

    getDataID(record: Record<string, any>, typeName: string): string | null {
        return getDataID(record, typeName);
    }
}

export const createRelayEnvironment = (
    records: RecordMap,
    token?: string,
    preview = false,
    withoutCache = false,
): Environment =>
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

                const appToken = token || process.env.API_TOKEN;
                if (appToken) {
                    headersObj.Authorization = `Bearer ${appToken}`;
                }
                // if (!vars?.publicationState) {
                //     vars.publicationState = getPublicationState(true);
                // }

                const req = await fetch(process.env.API_ENDPOINT, {
                    body: JSON.stringify({ query: operation.text, variables: vars }),
                    headers: headersObj,
                    method: 'POST',
                    // cache: withoutCache ? 'no-store' : 'force-cache',

                    // TODO: Umožnit nastavovat cache strategy pro všechna volání providera / zasílání tagů !!!
                    // Revalidace tagů zneplatní stránky, ale ne relay query fetch na Strapi !!!
                    cache: 'no-store',
                });
                const data = await req.json();
                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), vars);
                Logger.error(e);
            }
        }),
        store: new Store(new CustomRecordSource(records) as any),
        isServer: true,
        getDataID,
    });
