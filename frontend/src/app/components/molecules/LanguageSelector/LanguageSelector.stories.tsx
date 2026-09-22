import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageSelector } from './LanguageSelector';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof LanguageSelector> = {
    title: 'Molecules/LanguageSelector',
    component: LanguageSelector,
    parameters: {
        layout: 'padded',
    },
    args: {
        app,
    },
    argTypes: {
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof LanguageSelector>;

// The component toggles between `cs` and `en`, so a non-cs locale shows "CS".
export const Default: Story = {};

export const Czech: Story = {
    args: {
        app: { ...app, locale: 'cs' } as typeof app,
    },
};
