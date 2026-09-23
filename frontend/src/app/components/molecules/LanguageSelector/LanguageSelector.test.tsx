import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector', () => {
    it('should show EN when the current locale is cs', () => {
        render(<LanguageSelector app={{ locale: 'cs', page: null, item: null } as any} />);
        expect(screen.getByRole('button', { name: 'Change locale' })).toHaveTextContent('EN');
    });

    it('should show CS when the current locale is en', () => {
        render(<LanguageSelector app={{ locale: 'en', page: null, item: null } as any} />);
        expect(screen.getByRole('button', { name: 'Change locale' })).toHaveTextContent('CS');
    });

    it('should keep the locale switcher available after click', async () => {
        const user = userEvent.setup();
        render(<LanguageSelector app={{ locale: 'cs', page: null, item: null } as any} />);

        await user.click(screen.getByRole('button', { name: 'Change locale' }));
        expect(screen.getByRole('button', { name: 'Change locale' })).toBeInTheDocument();
    });
});
