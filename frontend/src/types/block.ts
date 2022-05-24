import { IncomingMessage, ServerResponse } from 'http';
import { NextComponentType } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface BaseBlockProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksData?: any;
}

export interface StaticBlockContext {
    params?: ParsedUrlQuery;
    locale?: string;
    slug?: string;
    page?: any;
    block?: any;
}

export interface ServerSideBlockContext extends StaticBlockContext {
    req: IncomingMessage;
    res: ServerResponse;
    basePath: string;
}

export type BlockGetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (context: ServerSideBlockContext) => Promise<P>;

export type BlockGetStaticProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (ctx: StaticBlockContext) => Promise<P>;

export type BlockGetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (locale: string) => Promise<P[]>;

export declare type BlockType = NextComponentType<ServerSideBlockContext, any, any> & {
    getStaticProps?: BlockGetStaticProps;
    getStaticPaths?: BlockGetStaticPaths;
};
