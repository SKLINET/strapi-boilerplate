import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
    it('should render a table with the given cells', () => {
        render(
            <Table>
                <tbody>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </tbody>
            </Table>,
        );
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Cell' })).toBeInTheDocument();
    });
});
