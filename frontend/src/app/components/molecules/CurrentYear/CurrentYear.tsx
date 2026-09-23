'use client';

import { ReactElement, useEffect, useState } from 'react';

/** Evaluated when the module loads: at build time on the server, at page load in the browser. */
const initialYear = new Date().getFullYear().toString();

/**
 * @description Renders the current year.
 *
 * A client component on purpose. `new Date()` is an unstable value, so calling it while rendering a
 * server component is rejected under Cache Components — the prerender cannot bake in something that
 * changes between renders. The alternatives all cost more than they are worth here: a `'use cache'`
 * scope would freeze the year for the length of its profile (and drag the route's lifetime down to
 * whatever shorter profile it used), and `await connection()` would turn the footer into a dynamic
 * hole on every page.
 *
 * The server prerenders the build-time year and the effect corrects it on mount, so a year boundary
 * fixes itself on the next page load instead of waiting for a deploy. Seeding state rather than
 * reading the date during render is what keeps hydration from mismatching.
 * @returns {ReactElement} The year as text
 **/
const CurrentYear = (): ReactElement => {
    const [year, setYear] = useState(initialYear);

    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);

    return <>{year}</>;
};

export { CurrentYear };
