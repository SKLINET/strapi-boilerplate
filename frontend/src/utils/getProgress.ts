export const getProgress = (start: number, end: number, trigger: number): number => {
    const value = Math.min(1, Math.max(0, (trigger - start) / (end - start)));

    return Math.round(value * 100) / 100;
};
