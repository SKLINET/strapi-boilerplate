import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-countup', () => ({
    useCountUp: () => ({ start: vi.fn() }),
}));

import { BigNumber } from './BigNumber';

describe('BigNumber', () => {
    it('should render the formatted value and addition label', () => {
        render(<BigNumber data={{ id: '1', value: 1000, additionLabel: '+' }} />);

        expect(screen.getByText('1 000+')).toBeInTheDocument();
        expect(screen.getByText('800')).toBeInTheDocument();
    });
});
