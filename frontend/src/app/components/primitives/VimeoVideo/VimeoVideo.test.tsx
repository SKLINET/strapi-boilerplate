import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { VimeoVideo } from './VimeoVideo';

describe('VimeoVideo', () => {
    it('should render a vimeo embed for the given uid and call loaded on load', () => {
        const loaded = vi.fn();
        const { container } = render(<VimeoVideo uid="999" loaded={loaded} />);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', 'https://player.vimeo.com/video/999?autoplay=1');

        fireEvent.load(iframe!);
        expect(loaded).toHaveBeenCalledOnce();
    });
});
