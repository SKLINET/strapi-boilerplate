import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataModal } from './DataModal';

const app = {
    webSetting: { name: 'JMB' },
    page: { documentId: 'page-6', title: 'Home', url: 'homepage' },
    systemResources: [{ codename: 'invalid_phone_number', value: 'Zadejte telefon' }],
    item: null,
    blocksPropsMap: {},
    locale: 'cs',
    preview: false,
    context: { params: {} },
} as any;

const open = async () => {
    const user = userEvent.setup();
    render(<DataModal app={app} />);
    await user.click(screen.getByRole('button', { name: 'Data stránky' }));

    return { user, dialog: screen.getByRole('dialog', { name: 'Data stránky' }) };
};

describe('DataModal', () => {
    it('should render the dialog only after the toggle is clicked', async () => {
        const user = userEvent.setup();
        render(<DataModal app={app} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Data stránky' }));
        expect(screen.getByRole('dialog', { name: 'Data stránky' })).toBeInTheDocument();
    });

    it('should list the data sources as tabs with their size, starting on the page', async () => {
        const { dialog } = await open();

        const page = within(dialog).getByRole('tab', { name: /Stránka/ });
        expect(page).toHaveAttribute('aria-selected', 'true');
        expect(page).toHaveTextContent('3');
        expect(within(dialog).getByRole('tab', { name: /Detail obsahu/ })).toHaveTextContent('0');
        expect(within(dialog).getByRole('tabpanel')).toHaveTextContent('"homepage"');
    });

    it('should show the category icon in each tab, outside its accessible name', async () => {
        const { dialog } = await open();

        const tabs = within(dialog).getAllByRole('tab');
        expect(tabs.map((tab) => tab.querySelector('[aria-hidden="true"]')?.textContent)).toEqual([
            '📝',
            '📝',
            '📦',
            '🧩',
            '⚙️',
            '🧹',
        ]);
        expect(within(dialog).getByRole('tab', { name: /^Stránka/ })).toBeInTheDocument();
    });

    it('should switch the panel when another tab is chosen', async () => {
        const { user, dialog } = await open();

        await user.click(within(dialog).getByRole('tab', { name: /Nastavení webu/ }));

        expect(within(dialog).getByRole('tabpanel')).toHaveTextContent('"JMB"');
    });

    it('should move between tabs with the arrow keys', async () => {
        const { user, dialog } = await open();

        within(dialog)
            .getByRole('tab', { name: /Stránka/ })
            .focus();
        await user.keyboard('{ArrowDown}');

        expect(within(dialog).getByRole('tab', { name: /Detail obsahu/ })).toHaveFocus();
        expect(within(dialog).getByRole('tab', { name: /Detail obsahu/ })).toHaveAttribute('aria-selected', 'true');
    });

    it('should show an empty state for a source without data', async () => {
        const { user, dialog } = await open();

        await user.click(within(dialog).getByRole('tab', { name: /Detail obsahu/ }));

        expect(within(dialog).getByRole('tabpanel')).toHaveTextContent('Žádná data');
    });

    it('should filter the data and count the matches in every tab', async () => {
        const { user, dialog } = await open();

        await user.type(within(dialog).getByRole('searchbox', { name: 'Hledat v datech' }), 'phone');

        expect(within(dialog).getByRole('tab', { name: /Všeobecné texty/ })).toHaveTextContent('1');
        expect(within(dialog).getByRole('tab', { name: /Stránka/ })).toHaveTextContent('0');
        expect(within(dialog).getByRole('tabpanel')).toHaveTextContent('Nic nenalezeno');
    });

    it('should offer the tabs with matches when the active one has none', async () => {
        const { user, dialog } = await open();

        await user.type(within(dialog).getByRole('searchbox', { name: 'Hledat v datech' }), 'phone');
        await user.click(within(within(dialog).getByRole('tabpanel')).getByRole('button', { name: /Všeobecné texty/ }));

        expect(within(dialog).getByRole('tab', { name: /Všeobecné texty/ })).toHaveAttribute('aria-selected', 'true');
        expect(within(dialog).getByRole('tabpanel').querySelector('mark')).toHaveTextContent('phone');
    });

    it('should copy the whole source of the active tab', async () => {
        const { user, dialog } = await open();

        await user.click(within(dialog).getByRole('button', { name: 'Kopírovat JSON' }));

        expect(JSON.parse(await navigator.clipboard.readText())).toEqual(app.page);
        expect(within(dialog).getByRole('button', { name: 'Zkopírováno' })).toBeInTheDocument();
    });

    it('should close with Escape and return focus to the toggle', async () => {
        const { user } = await open();

        await user.keyboard('{Escape}');

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Data stránky' })).toHaveFocus();
    });

    it('should close with the close button', async () => {
        const { user, dialog } = await open();

        await user.click(within(dialog).getByRole('button', { name: 'Zavřít' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
