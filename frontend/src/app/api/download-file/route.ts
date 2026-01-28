import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const fileUrl = req.nextUrl.searchParams.get('fileUrl');
        const filename = req.nextUrl.searchParams.get('filename');

        if (!fileUrl) {
            return NextResponse.json({ error: 'File URL is required' }, { status: 400 });
        }

        // Fetch the file from the external URL
        const response = await fetch(fileUrl);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch file' }, { status: 404 });
        }

        // Get the file content and headers
        const fileBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        // Extract filename from URL if not provided as parameter
        let finalFilename = filename;
        if (!finalFilename) {
            try {
                const url = new URL(fileUrl);
                const pathname = url.pathname;
                finalFilename = pathname.split('/').pop() || 'download';
            } catch {
                finalFilename = 'download';
            }
        }

        // Ensure filename has proper extension based on content type
        if (contentType.includes('pdf') && !finalFilename.toLowerCase().endsWith('.pdf')) {
            finalFilename += '.pdf';
        } else if (contentType.includes('image/') && !finalFilename.includes('.')) {
            const ext = contentType.split('/')[1];
            finalFilename += `.${ext}`;
        } else if (contentType.includes('text/') && !finalFilename.includes('.')) {
            const ext = contentType.split('/')[1];
            finalFilename += `.${ext}`;
        }

        const contentDisposition = `attachment; filename="${finalFilename}"`;

        // Return the file as a download
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': contentDisposition,
                'Cache-Control': 'no-cache',
            },
        });
    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
