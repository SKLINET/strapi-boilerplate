import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
    it('should render the current year in the footer', async () => {
        const year = new Date().getFullYear().toString();
        const el = await Footer({ app: { locale: 'cs' } as any });
        render(el);

        expect(screen.getByRole('contentinfo')).toHaveTextContent(`© Sklinet ${year}`);
    });
});
