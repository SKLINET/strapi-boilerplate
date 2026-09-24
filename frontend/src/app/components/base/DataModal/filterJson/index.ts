export interface FilterJsonResult {
    /** The pruned data, or `undefined` when nothing matches. Arrays stay sparse to keep item indices. */
    data: unknown;
    matches: number;
}

const NO_MATCH: FilterJsonResult = { data: undefined, matches: 0 };

const isBranch = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

/**
 * @param {boolean} isRecord - An array item: once something in it matches, its plain fields stay
 * as context (the `value` next to a matching `codename`)
 **/
const walk = (value: unknown, query: string, isRecord = false): FilterJsonResult => {
    if (!isBranch(value)) {
        return String(value).toLowerCase().includes(query) ? { data: value, matches: 1 } : NO_MATCH;
    }

    const isArray = Array.isArray(value);
    const results = Object.entries(value).map(([key, child]) => ({
        key,
        child,
        // A matching key keeps its whole subtree; array indices are not searched.
        result:
            !isArray && key.toLowerCase().includes(query) ? { data: child, matches: 1 } : walk(child, query, isArray),
    }));

    const matches = results.reduce((sum, { result }) => sum + result.matches, 0);
    if (matches === 0) return NO_MATCH;

    const out: Record<string, unknown> | unknown[] = isArray ? [] : {};

    for (const { key, child, result } of results) {
        if (result.matches > 0) {
            (out as Record<string, unknown>)[key] = result.data;
        } else if (isRecord && !isBranch(child)) {
            (out as Record<string, unknown>)[key] = child;
        }
    }

    return { data: out, matches };
};

/**
 * @description Prunes JSON-like data to the keys and leaf values that contain the query
 * @param {unknown} data - Plain data (objects, arrays, primitives)
 * @param {string} query - Case-insensitive text; blank returns the data as is
 * @returns {FilterJsonResult} The pruned data and the number of matching keys and values
 **/
export const filterJson = (data: unknown, query: string): FilterJsonResult => {
    const normalized = query.trim().toLowerCase();

    return normalized ? walk(data, normalized) : { data, matches: 0 };
};
