import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category } from './Category';

describe('Category', () => {
    it('should render the title and data, and toggle on click', async () => {
        const user = userEvent.setup();
        render(<Category title="⚙️ Nastavení webu" data={{ name: 'JMB' }} />);

        expect(screen.getByRole('button', { name: '⚙️ Nastavení webu' })).toBeInTheDocument();
        expect(screen.getByText(/"name": "JMB"/)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: '⚙️ Nastavení webu' }));
        expect(screen.getByText(/"name": "JMB"/)).toBeInTheDocument();
    });
});
