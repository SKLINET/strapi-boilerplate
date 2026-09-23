import { ReactElement } from 'react';
import { GtmProvider } from '../GtmProvider/GtmProvider';
import { WithoutScripts } from '../WithoutScripts/WithoutScripts';

interface AnalyticsProps {
    gtmCode: string | null;
}

/**
 * @description Renders Google Tag Manager and its noscript fallback.
 *
 * Wrapped internally in `WithoutScripts`, so `?withoutScripts=1` audit requests render with zero
 * third-party scripts **server-side** — nothing to remove on the client, so no flash.
 *
 * `WithoutScripts` reads `headers()`, which makes this a dynamic hole: every caller puts it behind
 * its own `<Suspense>` and renders it as a *sibling* of the page tree rather than a wrapper.
 * Wrapping would postpone everything below it and cost the static shell.
 * @param {string | null} gtmCode - GTM container id, or null when analytics are off
 * @returns {ReactElement} The analytics scripts
 **/
const Analytics = ({ gtmCode }: AnalyticsProps): ReactElement => (
    <WithoutScripts>
        <GtmProvider gtmCode={gtmCode} />
    </WithoutScripts>
);

export { Analytics };
