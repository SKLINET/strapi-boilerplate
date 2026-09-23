import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
    it('should render children in a paragraph by default', () => {
        render(<Text>Hello</Text>);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should render children in a span when tag is span', () => {
        render(<Text tag="span">Inline</Text>);
        expect(screen.getByText('Inline')).toBeInTheDocument();
    });
});
