import { JsonObject } from '@croct/plug-react';
import { CroctSlotId } from '../lib/croct/config';

export interface FetchCroctResult<T> {
    content: T;
    experiment?: {
        id: string;
        variant: string;
    };
    usedCroct: boolean;
    error?: string;
}

export interface CroctFetchOptions<T> {
    slotId: CroctSlotId | string;
    fallback: T;
    preferredLocale?: string;
    timeout?: number;
}

export interface HeroBannerContent extends JsonObject {
    title: string;
    subtitle?: string;
    ctaText: string;
    ctaUrl: string;
    variant: 'default' | 'minimal' | 'full-width';
}

export interface ArticleRecommendationsContent extends JsonObject {
    title: string;
    algorithmType: 'trending' | 'personalized' | 'recent';
    maxItems: number;
}

export interface CtaButtonContent extends JsonObject {
    text: string;
    variant: 'primary' | 'secondary' | 'outline';
    size: 'small' | 'medium' | 'large';
}

export interface SlotContentMap {
    'hero-banner': HeroBannerContent;
    'article-recommendations': ArticleRecommendationsContent;
    'cta-button': CtaButtonContent;
    [key: string]: unknown;
}
