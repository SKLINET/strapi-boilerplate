import { NextApiResponse, NextApiRequest } from 'next';
import { ServerOptions } from 'http-proxy';
import httpProxy from 'http-proxy';
export interface NextHttpProxyMiddlewareOptions extends ServerOptions {
    pathRewrite?: { [key: string]: string };
}

/**
 * @see https://www.npmjs.com/package/http-proxy
 */
const proxy: httpProxy = httpProxy.createProxy();

/**
 * If a key pattern is found in `pathRewrite` that matches the url value,
 * replace matched string of url with the `pathRewrite` value.
 * @param req
 * @param pathRewrite
 */
export const rewritePath = (url: string, pathRewrite: { [key: string]: string }) => {
    for (const patternStr in pathRewrite) {
        const pattern = RegExp(patternStr);
        const path = pathRewrite[patternStr];
        if (pattern.test(url as string)) {
            return url.replace(pattern, path);
        }
    }
    return url;
};

/**
 * Next.js HTTP Proxy Middleware
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @param {NextHttpProxyMiddlewareOptions} httpProxyOptions
 */
const httpProxyMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    httpProxyOptions: NextHttpProxyMiddlewareOptions = {},
): Promise<any> =>
    new Promise((resolve, reject) => {
        const { pathRewrite } = httpProxyOptions;
        if (pathRewrite) {
            req.url = rewritePath(req.url as string, pathRewrite);
        }
        if (['POST', 'PUT'].indexOf(req.method as string) >= 0 && typeof req.body === 'object') {
            req.body = JSON.stringify(req.body);
        }
        proxy
            .once('proxyReq', ((proxyReq: any, req: any): void => {
                if (['POST', 'PUT'].indexOf(req.method as string) >= 0 && typeof req.body === 'string') {
                    proxyReq.write(req.body);
                    proxyReq.end();
                }
            }) as any)
            .once('proxyRes', resolve as any)
            .once('error', reject)
            .web(req, res, {
                changeOrigin: true,
                ...httpProxyOptions,
            });
    });

export default httpProxyMiddleware;
