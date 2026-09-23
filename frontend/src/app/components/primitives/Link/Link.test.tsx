import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
    it('should render an internal link with the given href and name', () => {
        render(
            <Link href="/about" alt="About">
                About
            </Link>,
        );
        expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    });

    it('should render an external link as a plain anchor', () => {
        render(
            <Link href="https://example.com" alt="Example">
                Example
            </Link>,
        );
        expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute('href', 'https://example.com');
    });
});
