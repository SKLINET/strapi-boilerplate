import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataPreview } from './DataPreview';

describe('DataPreview', () => {
    it('should render the title and serialized data', () => {
        render(<DataPreview title="Preview" data={{ id: 1 }} />);

        expect(screen.getByRole('heading', { level: 2, name: 'Preview' })).toBeInTheDocument();
        expect(screen.getByText(/"id": 1/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Zobrazit vše' })).toBeInTheDocument();
    });

    it('should hide the expand button after it is clicked', async () => {
        const user = userEvent.setup();
        render(<DataPreview title="Preview" data={{ id: 1 }} />);

        await user.click(screen.getByRole('button', { name: 'Zobrazit vše' }));
        expect(screen.queryByRole('button', { name: 'Zobrazit vše' })).not.toBeInTheDocument();
    });
});
