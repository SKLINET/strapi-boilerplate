import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { BurgerButton } from './BurgerButton';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof BurgerButton> = {
    title: 'Molecules/BurgerButton',
    component: BurgerButton,
    parameters: {
        layout: 'padded',
    },
    args: {
        active: false,
        app,
    },
    argTypes: {
        onClick: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    // The navbar owns the open state; toggle it locally so the animation shows.
    render: function Render(args) {
        const [active, setActive] = useState(args.active);

        return <BurgerButton {...args} active={active} onClick={() => setActive((e) => !e)} />;
    },
};

export default meta;

type Story = StoryObj<typeof BurgerButton>;

export const Closed: Story = {};

export const Open: Story = {
    args: {
        active: true,
    },
};
