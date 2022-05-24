export function isInternalLink(href: string): boolean {
    if (!href) {
        return false;
    }
    return href.substring(0, 4) !== 'http' && href.substring(0, 7) !== 'mailto:' && href.substring(0, 4) !== 'tel:';
}
