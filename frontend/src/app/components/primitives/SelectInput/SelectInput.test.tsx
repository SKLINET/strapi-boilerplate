import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectInput } from './SelectInput';

const app = {
    systemResources: [
        { codename: 'open_select', value: 'Open select' },
        { codename: 'hide_select', value: 'Hide select' },
        { codename: 'clear_select', value: 'Clear select' },
        { codename: 'empty_select_list', value: 'No options' },
    ],
} as any;

describe('SelectInput', () => {
    it('should render the label and let the user pick an option', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <SelectInput
                name="color"
                selectedItem={null}
                onChange={onChange}
                options={[{ id: '1', title: 'Red', data: 'red' }]}
                label="Color"
                placeholder="Pick a color"
                app={app}
            />,
        );

        expect(screen.getByText('Color')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Pick a color');

        await user.click(screen.getByRole('button', { name: 'Red' }));
        expect(onChange).toHaveBeenCalledWith({ id: '1', title: 'Red', data: 'red' });
    });

    it('should show the empty list message when there are no options', () => {
        render(<SelectInput name="color" selectedItem={null} onChange={vi.fn()} options={[]} app={app} />);
        expect(screen.getByText('No options')).toBeInTheDocument();
    });
});
