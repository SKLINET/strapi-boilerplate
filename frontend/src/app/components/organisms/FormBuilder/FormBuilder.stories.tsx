import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormBuilder } from './FormBuilder';
import { IBuiltForm } from '../../../../types/form';
import { app } from '../../../../storybook/fixtures';

const contactForm: IBuiltForm = {
    id: 'form-contact',
    title: 'Nezávazná poptávka',
    successMessage: 'Děkujeme, ozveme se do 24 hodin.',
    errorMessage: 'Odeslání se nezdařilo, zkuste to prosím znovu.',
    data: [
        { id: 'f-title', type: 'title', label: 'Nezávazná poptávka', isLarge: true, onFullWidth: true },
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
            id: 'f-glass',
            type: 'select',
            name: 'glass',
            label: 'Typ skla',
            placeholder: 'Vyberte typ skla',
            required: false,
            options: [
                { key: 'kalene', label: 'Kalené sklo' },
                { key: 'lepene', label: 'Lepené sklo' },
                { key: 'izolacne', label: 'Izolační sklo' },
            ],
            useOnly: false,
            onFullWidth: true,
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
        {
            id: 'f-files',
            type: 'file',
            name: 'files',
            label: 'Prílohy',
            placeholder: null,
            required: false,
            maxFileCount: 3,
            allowedFileTypes: ['.pdf', '.png', '.jpg'],
            maxFileSize: 5,
            useOnly: false,
            onFullWidth: true,
        },
        {
            id: 'f-consent',
            type: 'checkbox',
            name: 'consent',
            label: 'Súhlasím so spracovaním osobných údajov',
            required: true,
            useOnly: false,
            onFullWidth: true,
        },
        { id: 'f-submit', type: 'submit', label: 'Odeslat poptávku', onFullWidth: true },
    ],
};

const meta: Meta<typeof FormBuilder> = {
    title: 'Organisms/FormBuilder',
    component: FormBuilder,
    parameters: {
        layout: 'padded',
    },
    args: {
        data: contactForm,
        app,
    },
    argTypes: {
        data: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        sendEmail: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof FormBuilder>;

// Submitting posts to /api/submit-form, which is not available in Storybook —
// the error message is the expected outcome here.
export const Default: Story = {};

export const Minimal: Story = {
    args: {
        data: {
            id: 'form-newsletter',
            title: 'Newsletter',
            successMessage: 'Děkujeme za přihlášení.',
            errorMessage: 'Přihlášení se nezdařilo.',
            data: [
                {
                    id: 'n-email',
                    type: 'email',
                    name: 'email',
                    label: null,
                    placeholder: 'vas@email.cz',
                    required: true,
                    useOnly: false,
                    onFullWidth: true,
                },
                { id: 'n-submit', type: 'submit', label: 'Přihlásit se', onFullWidth: true },
            ],
        },
    },
};

export const ValidationError: Story = {
    name: 'Validation error (submit empty)',
    args: {
        data: {
            ...contactForm,
            data: contactForm.data.filter((e) => e.id !== 'f-files'),
        },
    },
};
