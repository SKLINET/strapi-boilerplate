export const CALENDAR_FORMATS: Record<string, unknown> = {
    cs: {
        lastDay: '[Včera]',
        sameDay: '[Dnes]',
        nextDay: '[Zítra]',
        lastWeek: 'l',
        nextWeek: 'l',
        sameElse: 'l',
    },
    en: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: 'L',
        nextWeek: 'dddd',
        sameElse: 'L',
    },
};

export enum ASYNC_STATES {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error',
}

export const STRAPI_MAX_LIMIT = 100;

export const MOBILE_LANDSCAPE = 576;
export const TABLET_BREAKPOINT = 768;
export const TABLET_LANDSCAPE_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1280;
export const LARGE_DESKTOP_BREAKPOINT = 1440;
export const FULL_HD_BREAKPOINT = 1920;
