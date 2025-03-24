import { draftMode, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const headersList = await headers();
    const draft = await draftMode();

    const referer = headersList.get('referer') || '/';

    draft.disable();

    return NextResponse.redirect(new URL(referer));
}

export const dynamic = 'force-static';
