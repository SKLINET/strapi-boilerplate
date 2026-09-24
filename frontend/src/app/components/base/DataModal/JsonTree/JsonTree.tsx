'use client';

import { ReactElement, ReactNode, useState } from 'react';
import styles from './JsonTree.module.scss';
import clsx from 'clsx';

interface JsonTreeProps {
    data: unknown;
    /** How many levels below the top are open at first; `Infinity` opens everything. */
    expandDepth?: number;
    /** Text to mark in keys and values. */
    highlight?: string;
}

interface NodeProps {
    name: string;
    value: unknown;
    depth: number;
    isIndex: boolean;
    expandDepth: number;
    highlight?: string;
}

/** Fields that name an object well enough to tell array items apart without opening them. */
const HINT_KEYS = ['__typename', 'title', 'name', 'codename', 'slug', 'label', 'type'];

const isBranch = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const getHint = (value: Record<string, unknown>): string | null => {
    const key = HINT_KEYS.find((hintKey) => typeof value[hintKey] === 'string' && value[hintKey]);

    return key ? (value[key] as string) : null;
};

const Highlight = ({ text, query }: { text: string; query?: string }): ReactNode => {
    const needle = query?.trim().toLowerCase();
    if (!needle) return text;

    const haystack = text.toLowerCase();
    const parts: ReactNode[] = [];
    let from = 0;

    for (let index = haystack.indexOf(needle); index !== -1; index = haystack.indexOf(needle, from)) {
        parts.push(
            text.slice(from, index),
            <mark key={index} className={styles.mark}>
                {text.slice(index, index + needle.length)}
            </mark>,
        );
        from = index + needle.length;
    }

    if (parts.length === 0) return text;
    parts.push(text.slice(from));

    return <>{parts}</>;
};

const Value = ({ value, highlight }: { value: unknown; highlight?: string }): ReactElement => {
    if (typeof value === 'string') {
        return (
            <span className={styles.string}>
                <Highlight text={`"${value}"`} query={highlight} />
            </span>
        );
    }

    const type = value === null ? 'null' : typeof value;

    return (
        <span className={clsx(styles.primitive, styles[type])}>
            <Highlight text={String(value)} query={highlight} />
        </span>
    );
};

const Node = ({ name, value, depth, isIndex, expandDepth, highlight }: NodeProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(depth < expandDepth);

    const label = (
        <span className={clsx(styles.key, isIndex && styles.index)}>
            <Highlight text={name} query={isIndex ? undefined : highlight} />
        </span>
    );

    if (!isBranch(value) || Object.keys(value).length === 0) {
        return (
            <li className={styles.leaf}>
                {label}
                {isBranch(value) ? (
                    <span className={styles.meta}>{Array.isArray(value) ? '[ ]' : '{ }'}</span>
                ) : (
                    <Value value={value} highlight={highlight} />
                )}
            </li>
        );
    }

    const isArray = Array.isArray(value);
    const entries = Object.entries(value);
    const hint = isArray ? null : getHint(value);

    return (
        <li>
            <button type="button" className={styles.toggle} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="m6 4 4 4-4 4" />
                </svg>
                {label}
                {hint && (
                    <span className={styles.hint}>
                        <Highlight text={hint} query={highlight} />
                    </span>
                )}
                <span className={styles.meta}>{isArray ? `[${entries.length}]` : `{${entries.length}}`}</span>
            </button>
            {isOpen && (
                <ul className={styles.children}>
                    {entries.map(([key, child]) => (
                        <Node
                            key={key}
                            name={key}
                            value={child}
                            depth={depth + 1}
                            isIndex={isArray}
                            expandDepth={expandDepth}
                            highlight={highlight}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

/** A collapsible, read-only view of JSON-like data. */
const JsonTree = ({ data, expandDepth = 0, highlight }: JsonTreeProps): ReactElement => {
    if (!isBranch(data)) {
        return (
            <div className={styles.tree}>
                <Value value={data} highlight={highlight} />
            </div>
        );
    }

    const isArray = Array.isArray(data);

    return (
        <ul className={styles.tree}>
            {Object.entries(data).map(([key, child]) => (
                <Node
                    key={key}
                    name={key}
                    value={child}
                    depth={0}
                    isIndex={isArray}
                    expandDepth={expandDepth}
                    highlight={highlight}
                />
            ))}
        </ul>
    );
};

export { JsonTree };
