import { revalidatePath } from 'next/cache';
export async function GET(request: Request) {
    revalidatePath('/', 'layout');
    return Response.json({ status: 'OK' });
}

export async function POST(request: Request) {
    revalidatePath('/', 'layout');
    return Response.json({ status: 'OK' });
}
