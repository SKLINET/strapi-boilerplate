export default function isStaging(): boolean {
    return process.env.IS_PREVIEW === '1';
}
