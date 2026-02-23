export const croctConfig = {
    appId: process.env.NEXT_PUBLIC_CROCT_APP_ID || '',
    debug: process.env.NODE_ENV === 'development',
};

export const CROCT_SLOTS = {
    HERO_BANNER: 'hero-banner',
    ARTICLE_RECOMMENDATIONS: 'article-recommendations',
    CTA_BUTTON: 'cta-button',
    FORM_VARIANT: 'form-variant',
} as const;

export type CroctSlotId = (typeof CROCT_SLOTS)[keyof typeof CROCT_SLOTS];
