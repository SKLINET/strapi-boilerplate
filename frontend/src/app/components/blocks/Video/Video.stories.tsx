import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Video } from './Video';
import { app, image } from '../../../../storybook/fixtures';

const meta: Meta<typeof Video> = {
    title: 'Blocks/Video',
    component: Video,
    parameters: {
        layout: 'fullscreen',
        // Video block is an async server component.
        react: { rsc: true },
    },
    args: {
        app,
        blocksData: {
            id: 'block-video',
            __typename: 'ComponentBlockVideoBlock',
            anchor: null,
            video: {
                id: 'v-1',
                uploadedVideo: null,
                externalVideo: {
                    provider: 'youtube',
                    providerUid: 'aqz-KE-bpKQ',
                    url: 'https://youtu.be/aqz-KE-bpKQ',
                },
                image,
            },
        } as never,
    },
    argTypes: {
        blocksData: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Video>;

export const Youtube: Story = {};

export const WithAnchor: Story = {
    args: {
        blocksData: {
            id: 'block-video-anchor',
            __typename: 'ComponentBlockVideoBlock',
            anchor: 'video',
            video: {
                id: 'v-2',
                uploadedVideo: { url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4', type: 'video/mp4' },
                externalVideo: null,
                image,
            },
        } as never,
    },
};

// Without a video the block renders an empty section.
export const WithoutVideo: Story = {
    args: {
        blocksData: {
            id: 'block-video-empty',
            __typename: 'ComponentBlockVideoBlock',
            anchor: null,
            video: null,
        } as never,
    },
};
