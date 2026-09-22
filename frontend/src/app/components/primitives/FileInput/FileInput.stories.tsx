import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { FileInput } from './FileInput';
import { IFileInput } from '../../../../types/file';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof FileInput> = {
    title: 'Primitives/FileInput',
    component: FileInput,
    parameters: {
        layout: 'padded',
    },
    args: {
        label: 'Prílohy',
        required: false,
        disabled: false,
        maxSize: 5,
        maxCount: 3,
        allowedFileTypes: ['.pdf', '.png', '.jpg'],
        app,
    },
    argTypes: {
        error: { control: 'text' },
        placeholder: { control: 'text' },
        value: { control: false, table: { disable: true } },
        onChange: { control: false, table: { disable: true } },
        onMaxSizeExceeded: { action: 'maxSizeExceeded', table: { disable: true } },
        onFileTypeError: { action: 'fileTypeError', table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    // The file list lives in the parent form; keep it local for the story.
    render: function Render(args) {
        const [files, setFiles] = useState<IFileInput[]>(args.value ?? []);

        return <FileInput {...args} value={files} onChange={setFiles} />;
    },
};

export default meta;

type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
    args: {
        value: [],
    },
};

export const SingleFile: Story = {
    args: {
        value: [],
        maxCount: 1,
    },
};

export const WithSelectedFiles: Story = {
    args: {
        value: [
            { typename: 'file', id: 'f-1', title: 'projekt.pdf', data: new File([''], 'projekt.pdf') },
            { typename: 'file', id: 'f-2', title: 'zameranie.png', data: new File([''], 'zameranie.png') },
        ] as IFileInput[],
    },
};

export const WithError: Story = {
    args: {
        value: [],
        error: 'Nahrajte aspoň jeden súbor',
    },
};

export const Disabled: Story = {
    args: {
        value: [],
        disabled: true,
    },
};
