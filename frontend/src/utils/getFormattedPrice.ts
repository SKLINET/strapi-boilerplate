export const getFormattedPrice = (value: number): string => {
    const _value: string[] = [];

    let _i = 0;
    for (let i = value.toString().length; i > 0; i--) {
        _value.unshift(value.toString().charAt(i - 1));
        _i++;

        if (_i % 3 === 0 && i !== 1) {
            if (value.toString().charAt(i) === '.' || value.toString().charAt(i) === ',') {
                _i = 1;
                continue;
            }
            _value.unshift(' ');
        }
    }

    return _value.join('');
};
