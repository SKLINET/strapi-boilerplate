import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormattedText } from './FormattedText';

describe('FormattedText', () => {
    it('should render rich text content', () => {
        render(<FormattedText content="<p>Formatted body</p>" />);
        expect(screen.getByText('Formatted body')).toBeInTheDocument();
    });
});
