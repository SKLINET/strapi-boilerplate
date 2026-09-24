'use client';

import { KeyboardEvent, ReactElement, ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './DataModal.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { Icon } from '../../primitives/Icon/Icon';
import { RemoveScroll } from 'react-remove-scroll';
import { JsonTree } from './JsonTree/JsonTree';
import { filterJson } from '@/app/components/base/DataModal/filterJson';

interface DataModalProps {
    app: IApp;
}

type SourceId = 'page' | 'item' | 'blocks' | 'resources' | 'webSetting' | 'rest';

interface Source {
    id: SourceId;
    icon: string;
    label: string;
    data: unknown;
}

const TITLE = 'Data stránky';

const sizeOf = (data: unknown): number => (typeof data === 'object' && data !== null ? Object.keys(data).length : 0);

/** A 16px line icon drawn like the CMS admin icons. */
const LineIcon = ({ children }: { children: ReactNode }): ReactElement => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
    >
        {children}
    </svg>
);

const DataModal = ({ app }: DataModalProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<SourceId>(app.item ? 'item' : 'page');
    const [query, setQuery] = useState('');
    const [expandAll, setExpandAll] = useState(false);
    const [copied, setCopied] = useState(false);

    const toggleRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const id = useId();

    const sources = useMemo(() => {
        const { webSetting, page, systemResources, item, blocksPropsMap, ...rest } = app;
        const list: Source[] = [
            { id: 'page', icon: '📝', label: 'Stránka', data: page },
            { id: 'item', icon: '📝', label: 'Detail obsahu', data: item },
            { id: 'blocks', icon: '📦', label: 'Data bloků', data: blocksPropsMap },
            { id: 'resources', icon: '🧩', label: 'Všeobecné texty', data: systemResources },
            { id: 'webSetting', icon: '⚙️', label: 'Nastavení webu', data: webSetting },
            { id: 'rest', icon: '🧹', label: 'Ostatní', data: rest },
        ];

        return list.map((source) => {
            const { data: filtered, matches } = filterJson(source.data, query);

            return { ...source, size: sizeOf(source.data), filtered, matches };
        });
    }, [app, query]);

    const isSearching = query.trim().length > 0;
    const active = sources.find((source) => source.id === activeId) ?? sources[0];

    const close = () => {
        setIsOpen(false);
        toggleRef.current?.focus();
    };

    useEffect(() => {
        if (!isOpen) return;

        searchRef.current?.focus();

        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            // The first Escape clears a search, the next one closes the panel.
            if (event.target === searchRef.current && searchRef.current?.value) {
                event.preventDefault();
                setQuery('');
                return;
            }

            setIsOpen(false);
            toggleRef.current?.focus();
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => setCopied(false), 1500);

        return () => clearTimeout(timeout);
    }, [copied]);

    const selectTab = (index: number) => {
        const next = (index + sources.length) % sources.length;

        setActiveId(sources[next].id);
        tabRefs.current[next]?.focus();
    };

    const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const moves: Record<string, number> = {
            ArrowDown: index + 1,
            ArrowRight: index + 1,
            ArrowUp: index - 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: sources.length - 1,
        };

        if (!(event.key in moves)) return;

        event.preventDefault();
        selectTab(moves[event.key]);
    };

    const copy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(active.data ?? null, null, 2));
        setCopied(true);
    };

    const renderContent = () => {
        if (active.size === 0) {
            return <p className={styles.empty}>Žádná data</p>;
        }

        if (isSearching && active.matches === 0) {
            const elsewhere = sources.filter((source) => source.matches > 0);

            return (
                <div className={styles.empty}>
                    <p>Nic nenalezeno pro „{query.trim()}“</p>
                    {elsewhere.length > 0 && (
                        <div className={styles.elsewhere}>
                            <span>Nalezeno v:</span>
                            {elsewhere.map((source) => (
                                <button
                                    key={source.id}
                                    type="button"
                                    onClick={() => setActiveId(source.id)}
                                    className={styles.button}
                                >
                                    {source.label} ({source.matches})
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <JsonTree
                key={`${active.id}|${query}|${expandAll}`}
                data={active.filtered}
                expandDepth={isSearching || expandAll ? Infinity : 0}
                highlight={query}
            />
        );
    };

    const subtitle = app.item?.title ?? app.page?.title;

    return (
        <>
            {isOpen && (
                <RemoveScroll className={styles.dialog}>
                    <div className={styles.overlay} onClick={close} />
                    <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
                        <header className={styles.header}>
                            <div className={styles.heading}>
                                <h2 id={`${id}-title`} className={styles.title}>
                                    {TITLE}
                                </h2>
                                {subtitle && (
                                    <p className={styles.subtitle}>
                                        <span className={styles.subtitle__text}>{subtitle}</span>
                                        {app.page?.url && <code className={styles.badge}>{app.page.url}</code>}
                                        <code className={styles.badge}>{app.locale}</code>
                                    </p>
                                )}
                            </div>
                            <button type="button" onClick={close} aria-label="Zavřít" className={styles.close}>
                                <LineIcon>
                                    <path d="M6 6l12 12M18 6 6 18" />
                                </LineIcon>
                            </button>
                        </header>

                        <div className={styles.body}>
                            <div role="tablist" aria-label="Zdroje dat" className={styles.tabs}>
                                {sources.map((source, index) => {
                                    const isActive = source.id === active.id;
                                    const count = isSearching ? source.matches : source.size;

                                    return (
                                        <button
                                            key={source.id}
                                            ref={(element) => {
                                                tabRefs.current[index] = element;
                                            }}
                                            type="button"
                                            role="tab"
                                            id={`${id}-tab-${source.id}`}
                                            aria-selected={isActive}
                                            aria-controls={`${id}-panel`}
                                            tabIndex={isActive ? 0 : -1}
                                            onClick={() => setActiveId(source.id)}
                                            onKeyDown={(event) => onTabKeyDown(event, index)}
                                            className={clsx(
                                                styles.tab,
                                                isActive && styles.tab__active,
                                                count === 0 && styles.tab__empty,
                                            )}
                                        >
                                            <span className={styles.tab__label}>
                                                <span className={styles.tab__icon} aria-hidden="true">
                                                    {source.icon}
                                                </span>
                                                {source.label}
                                            </span>
                                            <span className={styles.count}>{count}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className={styles.main}>
                                <div className={styles.toolbar}>
                                    <label className={styles.search}>
                                        <LineIcon>
                                            <circle cx="11" cy="11" r="6" />
                                            <path d="m20 20-4.5-4.5" />
                                        </LineIcon>
                                        <input
                                            ref={searchRef}
                                            type="search"
                                            value={query}
                                            onChange={(event) => setQuery(event.target.value)}
                                            placeholder="Hledat klíč nebo hodnotu…"
                                            aria-label="Hledat v datech"
                                            className={styles.search__input}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setExpandAll(!expandAll)}
                                        disabled={isSearching || active.size === 0}
                                        className={styles.button}
                                    >
                                        {expandAll ? 'Sbalit vše' : 'Rozbalit vše'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={copy}
                                        disabled={active.size === 0}
                                        className={styles.button}
                                    >
                                        {copied ? 'Zkopírováno' : 'Kopírovat JSON'}
                                    </button>
                                </div>

                                <div
                                    role="tabpanel"
                                    id={`${id}-panel`}
                                    aria-labelledby={`${id}-tab-${active.id}`}
                                    className={styles.content}
                                >
                                    {renderContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                </RemoveScroll>
            )}
            <button
                ref={toggleRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={TITLE}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                className={styles.mainButton}
            >
                <Icon name="sklinet-round" />
            </button>
        </>
    );
};

export { DataModal };
