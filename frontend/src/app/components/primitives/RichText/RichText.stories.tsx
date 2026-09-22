import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RichText } from './RichText';

const meta: Meta<typeof RichText> = {
    title: 'Primitives/RichText',
    component: RichText,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        content: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof RichText>;

export const Default: Story = {
    args: {
        content: [
            '<h2>Skleněná zábradlí</h2>',
            '<p>Navrhujeme a vyrábíme <b>celoskleněná zábradlí</b> pro interiér i <i>exteriér</i>.</p>',
            '<ul><li>Kalené sklo</li><li>Nerezové kotvení</li><li>Montáž na klíč</li></ul>',
            '<p>Viac v <a href="/kontakt" title="Kontakt">kontaktoch</a>.</p>',
        ].join(''),
    },
};

export const WithTable: Story = {
    args: {
        content:
            '<table><thead><tr><th>Typ</th><th>Tloušťka</th></tr></thead><tbody><tr><td>Kalené</td><td>8 mm</td></tr></tbody></table>',
    },
};
