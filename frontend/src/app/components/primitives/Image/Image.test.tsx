import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
    it('should render an image from a src url', () => {
        render(<Image src="https://example.com/a.jpg" alt="Hero" width={100} height={80} />);
        expect(screen.getByRole('img', { name: 'Hero' })).toHaveAttribute('src', 'https://example.com/a.jpg');
    });

    it('should render nothing when src is empty', () => {
        const { container } = render(<Image src="" alt="" width={1} height={1} />);
        expect(container).toBeEmptyDOMElement();
    });
});
