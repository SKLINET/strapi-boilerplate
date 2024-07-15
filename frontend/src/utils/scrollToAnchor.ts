export const scrollToAnchor = (anchor: string) => {
    const el = document.getElementById(anchor);

    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: el.clientHeight >= window.innerHeight ? 'start' : 'center',
        });
    }
};
