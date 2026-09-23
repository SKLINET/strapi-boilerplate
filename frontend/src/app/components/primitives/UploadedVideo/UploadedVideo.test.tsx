import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { UploadedVideo } from './UploadedVideo';

describe('UploadedVideo', () => {
    it('should render a video element for the fixture src after resize resolves', async () => {
        const { container } = render(
            <UploadedVideo video={{ url: 'https://cdn.example.com/clip.mp4', type: 'video/mp4' }} />,
        );

        await waitFor(() => {
            expect(container.querySelector('video')).toBeInTheDocument();
        });
        expect(container.querySelector('source')).toHaveAttribute('src', 'https://cdn.example.com/clip.mp4');
    });

    it('should call loaded when metadata is available', async () => {
        const loaded = vi.fn();
        const play = vi.fn();
        const { container } = render(
            <UploadedVideo video={{ url: 'https://cdn.example.com/clip.mp4', type: 'video/mp4' }} loaded={loaded} />,
        );

        const video = await waitFor(() => {
            const el = container.querySelector('video') as HTMLVideoElement | null;
            expect(el).toBeInTheDocument();
            return el!;
        });

        video.pause = vi.fn();
        video.play = play as any;
        video.dispatchEvent(new Event('loadedmetadata'));

        expect(loaded).toHaveBeenCalledOnce();
        expect(play).toHaveBeenCalled();
    });
});
