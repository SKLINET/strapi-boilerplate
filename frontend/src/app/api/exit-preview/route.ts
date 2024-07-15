import { draftMode, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const headersList = headers();
    const referer = headersList.get('referer') || '/';
    draftMode().disable();
    const response = NextResponse.redirect(new URL(referer));
    response.cookies.delete('previewData');
    return response;
}
