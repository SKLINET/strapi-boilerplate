import dynamic from 'next/dynamic';
import React, { ReactElement, ReactNode } from 'react';
import { Image } from '../../primitives/Image/Image';
import { VideoComponentProps } from '../Video/Video';
import { RichText } from '../../primitives/RichText/RichText';
import { Heading } from '../../primitives/Heading/Heading';
import { ImageProps } from '../../../types/image';
import { VideoProps } from '../../../types/video';
import { getImageUrl } from '../../../utils/getImageUrl';

interface BannerInterface {
    id: string;
    headline?: string | null;
    description?: string | null;
    textAlign?: string | null;
    image: ImageProps;
    video: VideoProps;
}

export type TextAlignCms = 'vlevo' | 'vpravo';

export interface CarouselProps {
    readonly id: string;
    readonly textAlign: string | null;
    readonly autoplay: boolean | null;
    readonly interval: number | null;
    readonly banners: ReadonlyArray<{
        readonly id: string;
        readonly image: {
            readonly url: string;
            readonly width: number | null;
            readonly height: number | null;
            readonly alt: string | null;
            readonly title: string | null;
        } | null;
        readonly video: {
            readonly width: number | null;
            readonly height: number | null;
            readonly video: {
                readonly streamingUrl: string;
                readonly thumbnailUrl: string;
            } | null;
        } | null;
        readonly headline: string | null;
        readonly description: string | null;
        readonly textAlign: string | null;
    }>;
    className?: string;
}

function getAlign(bannerAlign?: string | null, sliderAlign?: string | null): string {
    if (bannerAlign === 'dědit' || bannerAlign === 'inherit') {
        return sliderAlign === 'vlevo' || sliderAlign === 'left' ? 'left-0' : 'right-0';
    }
    return bannerAlign === 'vlevo' || bannerAlign === 'left' ? 'left-0' : 'right-0';
}

const Video = dynamic<VideoComponentProps>(() => import('../Video/Video').then((mod) => mod.Video));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarouselComponent = dynamic<any>(() => import('react-responsive-carousel').then((mod: any) => mod.Carousel));

const Banner = ({
    image,
    video,
    headline,
    description,
    textAlign,
    sliderTextAlign,
}: BannerInterface & { sliderTextAlign: string | null }): ReactElement => (
    <article className="w-full h-full min-h-[40rem] relative bg-black">
        {video?.data?.attributes?.url || video?.url ? (
            <Video video={video} autoPlay loop className="w-full h-full object-cover" />
        ) : (
            <Image image={image} layout="fill" className="w-full h-full object-cover" />
        )}

        <div
            className={`bg-white bg-opacity-80 absolute p-4 top-1/2 transform -translate-y-1/2 tablet:p-8 ${getAlign(
                textAlign,
                sliderTextAlign,
            )}`}
        >
            <Heading tag={'h1'} className="m-4 tablet:m-8 text-2xl tablet:text-3xl">
                {headline}
            </Heading>
            {description && <RichText content={description} />}
        </div>
    </article>
);

const renderIndicator = (interval: number | null) =>
    function Indicator(
        onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
        isSelected: boolean,
        index: number,
        label: string,
    ): ReactNode {
        return (
            <li
                className="flex my-0 mx-2 flex-row outline-none"
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
            >
                <span
                    className={`h-2 w-12 rounded-sm overflow-hidden opacity-60 relative bg-secondary ${
                        isSelected ? 'opacity-100' : ''
                    }`}
                >
                    <span
                        className={`absolute w-0 top-0 left-0 h-full bg-red ease-linear transition-width ${
                            isSelected ? 'w-full' : ''
                        }`}
                        style={{ transitionDuration: isSelected && interval ? interval + 's' : '0s' }}
                    />
                </span>
            </li>
        );
    };

const Carousel = ({
    banners,
    textAlign = 'left',
    autoplay = true,
    interval = 10,
    className,
}: CarouselProps): ReactElement | null => {
    if (!Array.isArray(banners) || banners.length < 1) {
        return null;
    }

    getImageUrl(banners[0]?.image?.data?.attributes?.url);
    if (banners.length === 1) {
        return <Banner {...banners[0]} sliderTextAlign={textAlign} />;
    } else {
        return (
            <CarouselComponent
                className={`w-full h-full ${className}`}
                showArrows={true}
                autoPlay={autoplay}
                interval={interval ? interval * 1000 : undefined}
                infiniteLoop={true}
                useKeyboardArrows={true}
                swipeable={true}
                showStatus={false}
                renderIndicator={renderIndicator(interval)}
                showThumbs={false}
            >
                {banners.map((banner, i) => (
                    <Banner key={`banner_${i}`} {...banner} sliderTextAlign={textAlign} />
                ))}
            </CarouselComponent>
        );
    }
};

Carousel.whyDidYouRender = true;

export { Carousel };
