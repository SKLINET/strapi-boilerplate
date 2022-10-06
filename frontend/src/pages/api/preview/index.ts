/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQuery } from 'relay-runtime';
import { previewSettingsQuery } from '../../../relay/api/__generated__/previewSettingsQuery.graphql';
import { getPageUrl } from '../../../utils/getPageUrl';
import { previewPageQuery } from '../../../relay/api/__generated__/previewPageQuery.graphql';
import { getPagePattern } from '../../../lib/routing/getPagePattern';
import { PreviewPageQuery, PreviewSettingsQuery } from '../../../relay/api/preview';
import { formatPageObject } from '../../../utils/formatPageObject';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { locale, type, slug } = req.query;
    const environment = createRelayEnvironment({});
    const data = await fetchQuery<previewSettingsQuery>(environment, PreviewSettingsQuery, {
        publicationState: 'PREVIEW',
        locale: locale || 'cs',
    }).toPromise();
    const settings = data?.webSetting?.data?.attributes || null;
    let url = locale === 'en' ? `/${locale}` : '';

    const homepage = formatPageObject(settings?.homePage?.data?.attributes?.url || '');

    switch (type) {
        case 'articles':
            url += `${getPageUrl(
                formatPageObject(settings?.articleDetailPage?.data?.attributes?.url || '') || homepage,
            )?.replace(':slug', String(slug))}`;
            break;
    }

    if (type === 'pages') {
        const p = await fetchQuery<previewPageQuery>(environment, PreviewPageQuery, {
            publicationState: 'PREVIEW',
            locale: locale || 'cs',
            pattern: getPagePattern(slug || ''),
        }).toPromise();
        if (p?.findPage) {
            url += `${getPageUrl(formatPageObject(p?.findPage?.url || '') || homepage)}`;
        }
    }

    res.setPreviewData({});
    res.statusCode = 307;
    res.setHeader('Location', url);
    res.end();
};
