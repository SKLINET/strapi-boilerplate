export function trackPage(currentUrl: string) {
    const url = currentUrl?.split('/') || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
        event: 'ga.page',
        pagePath: currentUrl,
        pageCategory1: url[2] || '',
        pageCategory2: url[3] || '',
        pageCategory3: url[4] || '',
        pageCategory4: url[5] || '',
        pageCategory5: url[6] || '',
    });
}
