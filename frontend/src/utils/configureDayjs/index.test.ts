import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { configureDayjs } from './index';

describe('configureDayjs', () => {
    it('should set the dayjs locale from the app', () => {
        configureDayjs({ locale: 'cs' } as any);
        expect(dayjs.locale()).toBe('cs');
    });

    it('should accept the calendar months variant without throwing', () => {
        expect(() => configureDayjs({ locale: 'en' } as any, 'calendar')).not.toThrow();
        expect(dayjs.locale()).toBe('en');
    });
});
