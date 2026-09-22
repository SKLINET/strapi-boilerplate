import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
    it('should render the given tag and text', () => {
        render(<Heading tag="h1">Title</Heading>);
        expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
    });

    it('should render an h3 when that tag is given', () => {
        render(<Heading tag="h3">Section</Heading>);
        expect(screen.getByRole('heading', { level: 3, name: 'Section' })).toBeInTheDocument();
    });
});
