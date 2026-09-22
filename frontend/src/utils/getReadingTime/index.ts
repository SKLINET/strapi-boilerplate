export const getReadingTime = (value: string): number => {
    const cleanText = value.replace(/(<([^>]+)>)/gi, '');
    const wpm = 225;
    const words = cleanText.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wpm));

    return minutes;
};
