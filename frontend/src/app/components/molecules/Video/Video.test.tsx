import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/dynamic', () => ({
    default: () =>
        function MockYoutubeVideo({ uid }: { uid: string }) {
            return <iframe title="YouTube video" src={`https://youtube.com/embed/${uid}?autoplay=1&mute=1`} />;
        },
}));

import { Video } from './Video';

const app = {
    systemResources: [{ codename: 'play_video', value: 'Play video' }],
} as any;

const youtubeData = {
    id: '1',
    uploadedVideo: null,
    image: null,
    externalVideo: {
        provider: 'youtube',
        providerUid: 'abc123',
        url: 'https://youtube.com/watch?v=abc123',
    },
};

describe('Video', () => {
    it('should show a play control and youtube poster before playing', () => {
        render(<Video data={youtubeData} app={app} />);

        expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'YouTube video image' })).toBeInTheDocument();
    });

    it('should load the youtube embed after play is clicked', async () => {
        const user = userEvent.setup();
        render(<Video data={youtubeData} app={app} />);

        await user.click(screen.getByRole('button', { name: 'Play video' }));

        await waitFor(() => {
            expect(screen.getByTitle('YouTube video')).toHaveAttribute(
                'src',
                'https://youtube.com/embed/abc123?autoplay=1&mute=1',
            );
        });
    });
});
