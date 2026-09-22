import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../molecules/Video/Video', () => ({
    Video: () => <div>molecule-video</div>,
}));

import { Video } from './Video';

const app = {
    locale: 'cs',
    systemResources: [{ codename: 'play_video', value: 'Play video' }],
} as any;

describe('Video block', () => {
    it('should render a section without a video when the fixture is empty', async () => {
        const el = await Video({
            blocksData: { id: '1', video: null, anchor: null } as any,
            app,
        });
        render(el);

        expect(screen.queryByText('molecule-video')).not.toBeInTheDocument();
    });

    it('should render the video molecule when a video fixture is present', async () => {
        const el = await Video({
            blocksData: {
                id: '1',
                anchor: null,
                video: {
                    id: 'v1',
                    uploadedVideo: null,
                    optionalImage: null,
                    externalVideo: {
                        provider: 'youtube',
                        providerUid: 'abc123',
                        url: 'https://youtube.com/watch?v=abc123',
                    },
                },
            } as any,
            app,
        });
        render(el);

        expect(screen.getByText('molecule-video')).toBeInTheDocument();
    });
});
