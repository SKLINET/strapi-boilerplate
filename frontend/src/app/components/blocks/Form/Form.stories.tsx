import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Form } from './Form';
import { app } from '../../../../storybook/fixtures';

const form = {
    documentId: 'form-1',
    title: 'Nezávazná poptávka',
    successMessage: 'Děkujeme, ozveme se do 24 hodin.',
    errorMessage: 'Odeslání se nezdařilo, zkuste to prosím znovu.',
    // Strapi stores the field definitions as a JSON column.
    data: [
        {
            id: 'f-name',
            type: 'textinput',
            name: 'name',
            label: 'Jméno a příjmení',
            placeholder: 'Jana Nováková',
            required: true,
            useOnly: false,
            onFullWidth: false,
        },
        {
            id: 'f-email',
            type: 'email',
            name: 'email',
            label: 'E-mail',
            placeholder: 'jana@email.cz',
            required: true,
            useOnly: false,
            onFullWidth: false,
        },
        {
            id: 'f-message',
            type: 'textarea',
            name: 'message',
            label: 'Popis projektu',
            placeholder: 'Popište nám váš projekt…',
            required: false,
            useOnly: false,
            onFullWidth: true,
        },
        { id: 'f-submit', type: 'submit', label: 'Odeslat', onFullWidth: true },
    ],
};

const meta: Meta<typeof Form> = {
    title: 'Blocks/Form',
    component: Form,
    parameters: {
        layout: 'fullscreen',
        // Form block is an async server component.
        react: { rsc: true },
    },
    args: {
        app,
        blocksData: {
            id: 'block-form',
            __typename: 'ComponentBlockFormBlock',
            anchor: null,
            form,
            sendEmail: { id: 'e-1', from: 'web@sklinet.sk', to: 'info@sklinet.sk', subject: 'Nová poptávka' },
        } as never,
    },
    argTypes: {
        blocksData: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

// Without a form definition the block renders nothing.
export const WithoutForm: Story = {
    args: {
        blocksData: {
            id: 'block-form-empty',
            __typename: 'ComponentBlockFormBlock',
            anchor: null,
            form: null,
            sendEmail: null,
        } as never,
    },
};
