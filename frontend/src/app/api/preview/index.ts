// route handler with secret and slug
import { draftMode } from 'next/headers';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
import { fetchQuery } from 'relay-runtime';
import { previewSettingsQuery } from '../../../relay/api/__generated__/previewSettingsQuery.graphql';
import { PreviewPageQuery, PreviewSettingsQuery } from '../../../relay/api/preview';
import { formatPageObject } from '../../../utils/base/formatPageObject';
import { getPageUrl } from '../../../utils/getPageUrl';
import { previewPageQuery } from '../../../relay/api/__generated__/previewPageQuery.graphql';
import { getPagePattern } from '../../../lib/routing/getPagePattern';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Parse query string parameters
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');
    const slug = searchParams.get('slug');
    const type = searchParams.get('type');
    const pageId = searchParams.get('pageId');
    const itemId = searchParams.get('itemId');
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

    // Enable Draft Mode by setting the cookie
    draftMode().enable();

    const headers = new Headers(request.headers);
    headers.set(
        'Set-Cookie',
        `previewData=${JSON.stringify({ pageId, itemId, itemSlug: slug, pageSlug: slug, url: url })}`,
    );
    return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_BASE_PATH + url), { headers });
}
