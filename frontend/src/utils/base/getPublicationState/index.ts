export default function getPublicationState(preview: boolean | undefined): 'DRAFT' | 'PUBLISHED' {
    return preview ? 'DRAFT' : 'PUBLISHED';
}
