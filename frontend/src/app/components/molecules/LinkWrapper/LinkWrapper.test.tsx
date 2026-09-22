import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkWrapper } from './LinkWrapper';

describe('LinkWrapper', () => {
    it('should render a link and the given content', () => {
        render(
            <LinkWrapper href="/story" alt="Read more">
                Card body
            </LinkWrapper>,
        );

        expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute('href', '/story');
        expect(screen.getByText('Card body')).toBeInTheDocument();
    });
});
