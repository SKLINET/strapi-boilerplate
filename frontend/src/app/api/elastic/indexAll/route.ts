import { NextRequest } from 'next/server';
import AbstractElasticProvider from '../../../../lib/provider/AbstractElasticProvider';
import { findProvider } from '../../../../utils/base/findProvider';
import AbstractSingletonElasticProvider from '../../../../lib/provider/AbstractSingletonElasticProvider';

export async function GET(request: NextRequest) {
    const typeId = String(request.nextUrl.searchParams.get('typeId'));
    const prod = Boolean(request.nextUrl.searchParams.get('prod')) || false;

    try {
        const provider = findProvider(typeId);

        try {
            if (provider && provider instanceof AbstractElasticProvider) {
                await provider.deleteAndIndexAll(prod);

                return new Response(
                    JSON.stringify({
                        status: 'OK',
                    }),
                    {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
            } else if (provider && provider instanceof AbstractSingletonElasticProvider) {
                await provider.index(false, prod);

                return new Response(
                    JSON.stringify({
                        status: 'OK',
                    }),
                    {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
            } else {
                return new Response(
                    JSON.stringify({
                        status: 'EMPTY',
                    }),
                    {
                        status: 204,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
            }
        } catch (e) {
            return new Response(
                JSON.stringify({
                    status: 'ERROR',
                    message: (e as { message: string }).message,
                    error: e,
                }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
        }
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 'ERROR',
                message: (e as { message: string }).message,
                error: e,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }
}
