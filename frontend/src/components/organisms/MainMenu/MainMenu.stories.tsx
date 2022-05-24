import React from 'react';
import { MainMenu as MainMenuComponent } from './MainMenu';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: MainMenuComponent,
    title: 'Organisms/MainMenu',
    args: {
        menu: {
            links: [
                { __typename: 'PageRecord', id: '4085953', url: 'homepage', title: 'Homepage' },
                { __typename: 'PageRecord', id: '4086002', url: 'aktuality', title: 'Aktuality' },
            ],
        },
    },
};

const Template: Story = (args) => <MainMenuComponent {...args} />;

export const MainMenu = Template.bind({});
