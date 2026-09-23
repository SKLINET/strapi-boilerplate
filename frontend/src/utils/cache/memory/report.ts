import { PRODUCTION_INSTANCE, PRODUCTION_RAM_BYTES, type MemorySnapshot } from './index';

export const percentOfRam = (bytes: number): number => {
    if (bytes <= 0) {
        return 0;
    }

    return Math.min(100, Math.round((bytes / PRODUCTION_RAM_BYTES) * 1000) / 10);
};

export const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const rest = seconds % 60;

    if (hours > 0) {
        return `${hours} h ${minutes} min`;
    }

    if (minutes > 0) {
        return `${minutes} min ${rest} s`;
    }

    return `${rest} s`;
};

const toneFor = (percent: number): 'ok' | 'mid' | 'high' => {
    if (percent >= 85) {
        return 'high';
    }

    if (percent >= 60) {
        return 'mid';
    }

    return 'ok';
};

const rows = (snapshot: MemorySnapshot) =>
    [
        {
            key: 'rss',
            mib: snapshot.mib.rss,
            bytes: snapshot.rss,
            title: 'RSS · celý Node proces',
            body: 'To grafuje App Platform a podle toho cgroup zabije instanci. Není to velikost cache — je to proces, heap, off-heap buffery i baseline Nextu.',
        },
        {
            key: 'heapUsed',
            mib: snapshot.mib.heapUsed,
            bytes: snapshot.heapUsed,
            title: 'heapUsed · JavaScript heap',
            body: "Živý JS. Když stoupá k 50–100 MB a arrayBuffers jsou ploché, in-memory LRU se plní. Když leze dál s RSS, těla 'use cache' (a jejich request graph) zůstávají v procesu.",
        },
        {
            key: 'heapTotal',
            mib: snapshot.mib.heapTotal,
            bytes: snapshot.heapTotal,
            title: 'heapTotal · rezervovaný V8 heap',
            body: 'Kolik si V8 už vzal. Po eviction často neklesne — Linux stránky procesu nevrací hned.',
        },
        {
            key: 'external',
            mib: snapshot.mib.external,
            bytes: snapshot.external,
            title: 'external · native vazby',
            body: 'C++ objekty přivázané k JS (Buffer, některé klienty). Mimo V8 heap, pořád v RSS.',
        },
        {
            key: 'arrayBuffers',
            mib: snapshot.mib.arrayBuffers,
            bytes: snapshot.arrayBuffers,
            title: 'arrayBuffers · streamy mimo LRU',
            body: "Off-heap těla z tee() u default 'use cache' handleru a z fetch clone. Růst při plochém heapUsed = leak, který sdílený cache handler neopraví.",
        },
        {
            key: 'cacheMaxMemorySize',
            mib: snapshot.mib.cacheMaxMemorySize,
            bytes: snapshot.cacheMaxMemorySize,
            title: 'cacheMaxMemorySize · počítaný strop LRU',
            body: "Dokumentovaný default 50 MB na jednu in-memory cache (server/ISR a 'use cache' zvlášť); v next.config.ts se nepřepisuje. Počítá se serializované tělo, ne RSS. Dvě LRU = až 100 MB započtených těl.",
        },
    ] as const;

export const renderMemoryReport = (snapshot: MemorySnapshot): string => {
    const ramShort = PRODUCTION_INSTANCE.ramShort;
    const meters = rows(snapshot)
        .map((row) => {
            const percent = percentOfRam(row.bytes);
            const tone = toneFor(percent);

            return `
            <article class="card">
                <div class="card__head">
                    <div>
                        <p class="eyebrow">${row.key}</p>
                        <h2>${row.title}</h2>
                    </div>
                    <p class="num">${row.mib} MiB <span>${percent} % z ${ramShort}</span></p>
                </div>
                <div class="meter meter--${tone}" role="img" aria-label="${row.key} ${row.mib} MiB, ${percent} procent z ${ramShort}">
                    <div class="meter__fill" style="width: ${percent}%"></div>
                </div>
                <p class="card__body">${row.body}</p>
            </article>`;
        })
        .join('');

    return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="refresh" content="10" />
<title>Paměť procesu</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
<style>
:root {
    color-scheme: light dark;
    --paper: #F4F6F8;
    --surface: #FFFFFF;
    --surface-2: #EDF0F4;
    --ink: #171B21;
    --slate: #59626E;
    --hairline: #D5DBE3;
    --long: #1F4D7A;
    --ok: #1F7A4D;
    --mid: #A96410;
    --high: #A8323F;
    --sans: 'IBM Plex Sans', system-ui, sans-serif;
    --cond: 'IBM Plex Sans Condensed', 'IBM Plex Sans', sans-serif;
    --mono: 'IBM Plex Mono', ui-monospace, monospace;
}
@media (prefers-color-scheme: dark) {
    :root {
        --paper: #0F1318;
        --surface: #161B22;
        --surface-2: #1D242D;
        --ink: #E3E8EE;
        --slate: #98A2AE;
        --hairline: #2A323C;
        --long: #7FB2E0;
        --ok: #5FC08C;
        --mid: #E0A244;
        --high: #E4808B;
    }
}
*, *::before, *::after { box-sizing: border-box; }
body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}
.page {
    max-width: 820px;
    margin: 0 auto;
    padding: clamp(1.25rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2rem) 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}
h1, h2 { font-family: var(--cond); font-weight: 700; margin: 0; line-height: 1.15; }
h1 { font-size: 2rem; letter-spacing: -.015em; }
h2 { font-size: 1.1rem; }
p { margin: 0; }
.eyebrow {
    font-family: var(--mono);
    font-size: .75rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--slate);
    margin: 0 0 .3rem;
}
.sub { color: var(--slate); max-width: 62ch; }
.facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1px;
    background: var(--hairline);
    border: 1px solid var(--hairline);
    border-radius: 3px;
    overflow: hidden;
}
.facts div { background: var(--surface); padding: .85rem 1rem; }
.facts dt { font-family: var(--mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--slate); }
.facts dd { margin: .2rem 0 0; font-family: var(--cond); font-weight: 700; font-size: 1.15rem; }
.card {
    background: var(--surface);
    border: 1px solid var(--hairline);
    border-radius: 3px;
    padding: 1rem 1.05rem 1.05rem;
    display: flex;
    flex-direction: column;
    gap: .65rem;
}
.card__head { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }
.num { font-family: var(--mono); font-weight: 600; text-align: right; white-space: nowrap; }
.num span { display: block; color: var(--slate); font-weight: 400; font-size: .75rem; }
.meter { height: 10px; background: var(--surface-2); border-radius: 99px; overflow: hidden; }
.meter__fill { height: 100%; border-radius: inherit; }
.meter--ok .meter__fill { background: var(--ok); }
.meter--mid .meter__fill { background: var(--mid); }
.meter--high .meter__fill { background: var(--high); }
.card__body { color: var(--slate); font-size: .875rem; }
.foot { color: var(--slate); font-size: .8125rem; }
a { color: var(--long); }
</style>
</head>
<body>
<div class="page">
    <header>
        <p class="eyebrow">GET /api/memory · obnovení každých 10 s</p>
        <h1>Paměť procesu</h1>
        <p class="sub">Čtení z tohoto Node procesu proti produkčnímu boxu App Platform. Procenta jsou z ${ramShort}, ne z 50&nbsp;MB LRU.</p>
    </header>
    <dl class="facts">
        <div><dt>Produkce</dt><dd>${PRODUCTION_INSTANCE.ramLabel}</dd></div>
        <div><dt>CPU</dt><dd>${PRODUCTION_INSTANCE.vcpuLabel}</dd></div>
        <div><dt>Bandwidth</dt><dd>${PRODUCTION_INSTANCE.bandwidthLabel}</dd></div>
        <div><dt>Uptime</dt><dd>${formatUptime(snapshot.uptimeSeconds)}</dd></div>
    </dl>
    ${meters}
    <p class="foot">heapUsed u capu + ploché arrayBuffers = LRU se chová. Rostoucí rss/heapUsed = těla v procesu. Jen arrayBuffers = leak mimo cache. JSON: <a href="?format=json"><code>?format=json</code></a></p>
</div>
</body>
</html>`;
};
