import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Video } from './Video';
import { app, image } from '../../../../storybook/fixtures';

const meta: Meta<typeof Video> = {
    title: 'Molecules/Video',
    component: Video,
    parameters: {
        layout: 'padded',
    },
    args: {
        sizes: '(max-width: 48rem) 100vw, 80vw',
        app,
    },
    argTypes: {
        data: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Video>;

// Click the poster to swap it for the embedded player.
export const Youtube: Story = {
    args: {
        data: {
            id: 'v-1',
            uploadedVideo: null,
            externalVideo: { provider: 'youtube', providerUid: 'aqz-KE-bpKQ', url: 'https://youtu.be/aqz-KE-bpKQ' },
            image,
        },
    },
};

export const Vimeo: Story = {
    args: {
        data: {
            id: 'v-2',
            uploadedVideo: null,
            externalVideo: { provider: 'vimeo', providerUid: '76979871', url: 'https://vimeo.com/76979871' },
            image,
        },
    },
};

export const Uploaded: Story = {
    args: {
        data: {
            id: 'v-3',
            uploadedVideo: { url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4', type: 'video/mp4' },
            externalVideo: null,
            image,
        },
    },
};

export const WithoutPoster: Story = {
    args: {
        data: {
            id: 'v-4',
            uploadedVideo: null,
            externalVideo: { provider: 'youtube', providerUid: 'aqz-KE-bpKQ', url: 'https://youtu.be/aqz-KE-bpKQ' },
            image: null,
        },
    },
};
