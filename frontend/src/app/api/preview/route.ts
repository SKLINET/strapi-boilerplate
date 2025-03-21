// route handler with secret and slug
import { draftMode } from 'next/headers';
import { createRelayEnvironment } from '../../../relay/createRelayEnvironment';
import { fetchQuery } from 'relay-runtime';
import { previewSettingsQuery, PublicationStatus } from '../../../relay/api/__generated__/previewSettingsQuery.graphql';
import { PreviewPageQuery, PreviewSettingsQuery } from '../../../relay/api/preview';
import { getPageUrl } from '../../../utils/getPageUrl';
import { previewPageQuery } from '../../../relay/api/__generated__/previewPageQuery.graphql';
import { getPagePattern } from '../../../lib/routing/getPagePattern';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Parse query string parameters
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');
    const slug = searchParams.get('slug');
    const status = (searchParams?.get('status')?.toUpperCase() as PublicationStatus) || 'DRAFT';
    const type = searchParams.get('type');
    const secret = searchParams.get('secret');
    const _locale = (locale || '').toString() || 'cs';
    if (secret !== process.env.PREVIEW_SECRET) {
        return new Response('Invalid token', { status: 401 });
    }

    const environment = createRelayEnvironment({});
    const data = await fetchQuery<previewSettingsQuery>(environment, PreviewSettingsQuery, {
        status,
        locale: _locale,
    }).toPromise();
    const settings = data?.webSetting || null;
    let url = '';

    const homepageUrl = settings?.homePage?.url;

    switch (type) {
        case 'api::article.article':
            url += `${getPageUrl(settings?.articleDetailPage?.url || '', _locale)?.replace(':slug', String(slug))}`;
            break;
    }

    if (type === 'api::page.page') {
        const p = await fetchQuery<previewPageQuery>(environment, PreviewPageQuery, {
            status,
            locale: _locale,
            pattern: getPagePattern(slug || ''),
        }).toPromise();
        if (p?.findPage) {
            url += `${getPageUrl(p?.findPage?.url || homepageUrl || '', _locale)}`;
        }
    }

    const dMode = await draftMode();
    if (status === 'PUBLISHED') {
        dMode.disable();
    } else {
        dMode.enable();
    }

    return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_BASE_PATH + url));
}

export const dynamic = 'force-static';
