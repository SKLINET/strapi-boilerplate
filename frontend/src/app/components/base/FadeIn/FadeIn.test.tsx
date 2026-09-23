import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FadeIn } from './FadeIn';

describe('FadeIn', () => {
    it('should render children in a section by default', () => {
        render(
            <FadeIn>
                <p>Fades in</p>
            </FadeIn>,
        );

        expect(screen.getByText('Fades in')).toBeInTheDocument();
    });

    it('should render a footer when that tag is given', () => {
        render(
            <FadeIn tag="footer">
                <p>Footer copy</p>
            </FadeIn>,
        );

        expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer copy');
    });
});
