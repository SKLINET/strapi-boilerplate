/**
 * Next.js page-slot fallback while `Page` is pending — the cold-miss UI. The layout (html, chrome)
 * stays mounted, so only the page body is replaced.
 *
 * Do not move this into `Page` or `RootLayout` as a <Suspense> fallback: this catch-all segment is
 * both the layout and the page, so a fallback there would flash on every navigation after a publish,
 * including ones whose `cachedStaticProps` entry is still valid.
 **/
const Loading = () => <div aria-busy="true" aria-live="polite" />;

export default Loading;
