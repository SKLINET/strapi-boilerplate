import React from 'react';
import { Navbar as NavbarComponent } from './Navbar';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: NavbarComponent,
    title: 'Organisms/Navbar',
};

const Template: Story = (args) => <NavbarComponent {...args} />;

export const Navbar = Template.bind({});
