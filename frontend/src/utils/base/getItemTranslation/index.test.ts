import { describe, expect, it } from 'vitest';
import { getItemTranslation } from './index';

describe('getItemTranslation', () => {
    it('should return null when there is no matching localization', () => {
        expect(getItemTranslation(null, 'en')).toBeNull();
        expect(getItemTranslation({ localizations: [{ locale: 'cs', slug: 'a' }] }, 'en')).toBeNull();
    });

    it('should return the matching localization with slug fallback to url', () => {
        expect(
            getItemTranslation(
                {
                    localizations: [
                        { locale: 'cs', slug: 'domu' },
                        { locale: 'en', url: 'home' },
                    ],
                },
                'en',
            ),
        ).toEqual({ locale: 'en', url: 'home', slug: 'home' });
    });
});
