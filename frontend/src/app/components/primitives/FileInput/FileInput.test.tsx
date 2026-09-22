import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileInput } from './FileInput';

const app = {
    systemResources: [
        { codename: 'upload_attachment', value: 'Upload file' },
        { codename: 'remove_file', value: 'Remove file' },
        { codename: 'file_size_error', value: 'Too large {value}' },
        { codename: 'file_type_error', value: 'Wrong type {allowedTypes}' },
    ],
} as any;

describe('FileInput', () => {
    it('should render a labelled file input and report selected files', () => {
        const onChange = vi.fn();
        render(<FileInput value={[]} onChange={onChange} onMaxSizeExceeded={vi.fn()} label="Attachment" app={app} />);

        expect(screen.getByText('Attachment')).toBeInTheDocument();
        const input = screen.getByLabelText('Upload file');
        const file = new File(['hello'], 'note.txt', { type: 'text/plain' });

        fireEvent.change(input, { target: { files: [file] } });

        expect(onChange).toHaveBeenCalledTimes(1);
        const nextValue = onChange.mock.calls[0]?.[0];
        expect(nextValue).toHaveLength(1);
        expect(nextValue[0].title).toBe('note.txt');
    });

    it('should list an already selected file and allow removing it', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <FileInput
                value={[{ typename: 'file', id: '1', title: 'note.txt', data: new File(['x'], 'note.txt') }]}
                onChange={onChange}
                onMaxSizeExceeded={vi.fn()}
                app={app}
            />,
        );

        expect(screen.getByText('note.txt')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Remove file' }));
        expect(onChange).toHaveBeenCalledWith([]);
    });
});
