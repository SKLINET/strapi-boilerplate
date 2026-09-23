import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Blockquote } from './Blockquote';

describe('Blockquote', () => {
    it('should render the quoted text', () => {
        render(<Blockquote>A quote</Blockquote>);
        expect(screen.getByRole('blockquote')).toHaveTextContent('A quote');
    });
});
