import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List } from './List';

describe('List', () => {
    it('should render an unordered list with items', () => {
        render(
            <List tag="ul">
                <li>One</li>
            </List>,
        );
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('listitem')).toHaveTextContent('One');
    });

    it('should render an ordered list when tag is ol', () => {
        render(
            <List tag="ol">
                <li>First</li>
            </List>,
        );
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('listitem')).toHaveTextContent('First');
    });
});
