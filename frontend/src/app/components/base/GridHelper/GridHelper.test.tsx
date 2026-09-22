import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GridHelper } from './GridHelper';

describe('GridHelper', () => {
    it('should render a toggle button that can be clicked', async () => {
        const user = userEvent.setup();
        render(<GridHelper />);

        const button = screen.getByRole('button');
        await user.click(button);
        expect(button).toBeInTheDocument();
    });
});
