export default function getFormattedPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace('(', '').replace(')', '').replace(/ /g, '');
}
