import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RichText } from './RichText';

describe('RichText', () => {
    it('should render paragraph text from an HTML fixture', () => {
        render(<RichText content="<p>Hello world</p>" />);
        expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('should render a heading from an HTML fixture', () => {
        render(<RichText content="<h2>Section</h2>" />);
        expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument();
    });
});
