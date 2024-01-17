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
    const { locale, type, slug, pageId, itemId } = req.query;
    const _locale = (locale || '').toString() || 'cs';

    const environment = createRelayEnvironment({});
    const data = await fetchQuery<previewSettingsQuery>(environment, PreviewSettingsQuery, {
        publicationState: 'PREVIEW',
        locale: _locale,
    }).toPromise();
    const settings = data?.webSetting?.data?.attributes || null;
    let url = '';

    const homepage = formatPageObject(settings?.homePage?.data?.attributes?.url || '');

    switch (type) {
        case 'articles':
            url += `${getPageUrl(settings?.articleDetailPage?.data?.attributes?.url || '', _locale)?.replace(
                ':slug',
                String(slug),
            )}`;
            break;
    }

    if (type === 'pages') {
        const p = await fetchQuery<previewPageQuery>(environment, PreviewPageQuery, {
            publicationState: 'PREVIEW',
            locale: _locale,
            pattern: getPagePattern(slug || ''),
        }).toPromise();
        if (p?.findPage) {
            url += `${getPageUrl(p?.findPage?.url || homepage?.data?.attributes?.url || '', _locale)}`;
        }
    }

    res.setPreviewData({ pageId: pageId, itemId: itemId, itemSlug: slug, pageSlug: slug });
    res.statusCode = 307;
    res.setHeader('Location', url || '/');
    res.end();
};
