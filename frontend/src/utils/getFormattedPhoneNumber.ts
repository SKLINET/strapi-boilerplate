export const getFormattedPhoneNumber = (phoneNumber: string): string =>
    phoneNumber.replace('(', '').replace(')', '').replace(/ /g, '');
