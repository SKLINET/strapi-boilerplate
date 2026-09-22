import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WidthLimiter } from './WidthLimiter';

describe('WidthLimiter', () => {
    it('should render children', () => {
        render(
            <WidthLimiter>
                <p>Limited</p>
            </WidthLimiter>,
        );
        expect(screen.getByText('Limited')).toBeInTheDocument();
    });
});
