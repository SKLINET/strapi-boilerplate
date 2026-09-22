import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Navbar } from './Navbar';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof Navbar> = {
    title: 'Organisms/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
        // Navbar is an async server component.
        react: { rsc: true },
    },
    args: {
        app,
    },
    argTypes: {
        app: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};

export const WithoutMenu: Story = {
    args: {
        app: {
            ...app,
            webSetting: { ...app.webSetting, mainMenu: null },
        } as unknown as typeof app,
    },
};

export const ManyItems: Story = {
    args: {
        app: {
            ...app,
            webSetting: {
                ...app.webSetting,
                mainMenu: {
                    documentId: 'menu-long',
                    title: 'Hlavní menu',
                    items: ['Služby', 'Realizace', 'O nás', 'Blog', 'Kariéra', 'Kontakt'].map((label, i) => ({
                        id: `long-${i}`,
                        label,
                        page: { documentId: `p-${i}`, title: label, url: `stranka-${i}` },
                        externalUrl: null,
                        openInNewTab: false,
                        anchor: null,
                    })),
                },
            },
        } as unknown as typeof app,
    },
};
