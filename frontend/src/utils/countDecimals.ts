export const countDecimals = (value: number) => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
};
