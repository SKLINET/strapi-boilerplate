export const DEFAULT_SLEEP_DURING_API_CALLS = 100;

export const sleep = (ms: number = DEFAULT_SLEEP_DURING_API_CALLS): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
