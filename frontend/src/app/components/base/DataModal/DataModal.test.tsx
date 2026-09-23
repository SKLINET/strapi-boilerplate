import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataModal } from './DataModal';

const app = {
    webSetting: { name: 'JMB' },
    page: { title: 'Home' },
    systemResources: [],
    item: null,
    blocksPropsMap: {},
} as any;

describe('DataModal', () => {
    it('should toggle the modal and show category titles', async () => {
        const user = userEvent.setup();
        render(<DataModal app={app} />);

        const toggle = screen.getByRole('button', { name: 'Show modal' });
        expect(screen.getByRole('button', { name: '⚙️ Nastavení webu' })).toBeInTheDocument();

        await user.click(toggle);
        expect(screen.getByRole('button', { name: 'Hide modal' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '📝 Stránka' })).toBeInTheDocument();
    });
});
