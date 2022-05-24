import isStaging from '../isStaging';

export default function getPublicationState(): 'PREVIEW' | 'LIVE' {
    return isStaging() ? 'PREVIEW' : 'LIVE';
}
