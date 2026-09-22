import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
    it('should render nothing when the name is empty', () => {
        const { container } = render(<Icon name="" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render the svg stub for a known icon name', () => {
        const { container } = render(<Icon name="tick" />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
