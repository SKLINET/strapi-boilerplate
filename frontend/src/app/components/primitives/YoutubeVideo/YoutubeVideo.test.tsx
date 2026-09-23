import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { YoutubeVideo } from './YoutubeVideo';

describe('YoutubeVideo', () => {
    it('should render a youtube embed for the given uid and call loaded on load', () => {
        const loaded = vi.fn();
        const { container } = render(<YoutubeVideo uid="abc123" loaded={loaded} />);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', 'https://youtube.com/embed/abc123?autoplay=1&mute=1');

        fireEvent.load(iframe!);
        expect(loaded).toHaveBeenCalledOnce();
    });
});
