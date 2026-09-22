import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UploadedVideo } from './UploadedVideo';

const video = {
    url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
    type: 'video/mp4',
};

const meta: Meta<typeof UploadedVideo> = {
    title: 'Primitives/UploadedVideo',
    component: UploadedVideo,
    parameters: {
        layout: 'padded',
    },
    args: {
        video,
        autoPlay: false,
        controls: true,
        muted: true,
        loop: false,
        withTransition: false,
    },
    argTypes: {
        video: { control: false, table: { disable: true } },
        loaded: { action: 'loaded', table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof UploadedVideo>;

export const Default: Story = {};

export const Autoplay: Story = {
    args: {
        autoPlay: true,
        muted: true,
        loop: true,
        controls: false,
    },
};
