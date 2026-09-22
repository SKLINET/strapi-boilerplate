import { describe, expect, it } from 'vitest';
import { getSendEmailType, getSendEmailListType } from './index';

describe('getSendEmailType', () => {
    it('should return null for missing input', () => {
        expect(getSendEmailType(null)).toBeNull();
    });

    it('should map from/to/subject', () => {
        expect(
            getSendEmailType({
                id: 'e1',
                emailFrom: 'a@test',
                emailTo: 'b@test',
                subject: 'Hi',
            } as any),
        ).toEqual({
            id: 'e1',
            from: 'a@test',
            to: 'b@test',
            subject: 'Hi',
        });
    });
});

describe('getSendEmailListType', () => {
    it('should skip nulls', () => {
        expect(
            getSendEmailListType([null, { id: 'e1', emailFrom: 'a', emailTo: 'b', subject: 's' }] as any),
        ).toHaveLength(1);
    });
});
