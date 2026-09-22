import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentYear } from './CurrentYear';

describe('CurrentYear', () => {
    it('should render the current year', () => {
        render(
            <span data-testid="year">
                <CurrentYear />
            </span>,
        );

        expect(screen.getByTestId('year')).toHaveTextContent(new Date().getFullYear().toString());
    });
});
