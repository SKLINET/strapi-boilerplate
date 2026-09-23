import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { FacebookVideo } from './FacebookVideo';

describe('FacebookVideo', () => {
    it('should render a facebook embed for the given url and call loaded on load', () => {
        const loaded = vi.fn();
        const url = 'https://www.facebook.com/watch/?v=1';
        const { container } = render(<FacebookVideo url={url} loaded={loaded} />);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', `https://www.facebook.com/plugins/video.php?href=${url}&autoplay=1`);

        fireEvent.load(iframe!);
        expect(loaded).toHaveBeenCalledOnce();
    });
});
