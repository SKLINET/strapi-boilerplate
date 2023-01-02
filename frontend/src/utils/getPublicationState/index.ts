export default function getPublicationState(preview: boolean | undefined): 'PREVIEW' | 'LIVE' {
    return preview ? 'PREVIEW' : 'LIVE';
}
