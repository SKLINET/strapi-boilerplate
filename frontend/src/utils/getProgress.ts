export const getProgress = (startY: number, endY: number, triggerY: number): number => {
    const value = Math.min(1, Math.max(0, (triggerY - startY) / (endY - startY)));

    return Math.round(value * 100) / 100;
};
