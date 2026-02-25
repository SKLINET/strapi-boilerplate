export const scrollToAnchor = (anchor: string, addition?: number) => {
    const el = document.getElementById(anchor);

    const headerHeight = document.getElementsByTagName('header')[0]?.clientHeight || 0;

    if (el) {
        if (el.clientHeight >= window.innerHeight - headerHeight) {
            window.scroll({
                top: el.getBoundingClientRect().top + window.scrollY - headerHeight - (addition || 0),
                behavior: 'smooth',
            });
        } else {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }
};
