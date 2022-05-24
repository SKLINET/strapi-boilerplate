import React, { CSSProperties, ReactElement } from 'react';
import NextImage, { ImageLoaderProps } from 'next/image';
import styles from './Image.module.scss';
import { getImageUrl } from '../../../utils/getImageUrl';
import { ImageProps } from '../../../types/image';
import clsx from 'clsx';

interface Props {
    image: ImageProps;
    layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
    objectFit?: 'cover' | 'contain';
    className?: string;
    style?: CSSProperties;
    priority?: boolean;
    srl_gallery_image?: string;
}

export const Image = ({
    image,
    layout,
    className,
    objectFit,
    style,
    priority,
    ...rest
}: Props): ReactElement | null => {
    const Wrapper = 'div';
    const imageUrl = getImageUrl(image?.data?.attributes?.url || '');

    const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
        if (process.env.IMGIX_PATH === undefined) {
            return `${process.env.API_BASE_PATH}`;
        } else return `${src}?w=${width}&q=${quality || 75},loseless=true&auto=format,compress&fit=fillmax`;
    };

    const resolveBlurUrl = (url: string, width?: number | null, height?: number | null) => {
        return `${url}?w=50&h=${(50 / ((width || 1) / (height || 1))).toFixed(
            0,
        )}&q=5,loseless=true&auto=format,compress&fit=fillmax`;
    };

    return (
        <Wrapper
            className={clsx(
                styles.wrapper,
                layout === 'fill' && styles.fill,
                objectFit === 'contain' && styles.contain,
                className,
            )}
            style={style}
        >
            <NextImage
                placeholder={!priority ? 'blur' : undefined}
                blurDataURL={
                    !priority
                        ? resolveBlurUrl(imageUrl, image?.data?.attributes?.width, image?.data?.attributes?.height)
                        : undefined
                }
                layout={layout}
                loader={imageUrl.indexOf('images/') !== -1 ? myLoader : undefined}
                width={layout === 'fill' ? undefined : image?.data?.attributes?.width || 0}
                height={layout === 'fill' ? undefined : image?.data?.attributes?.height || 0}
                src={imageUrl}
                loading={priority ? 'eager' : 'lazy'}
                alt={image?.data?.attributes?.alternativeText || ''}
                objectFit={objectFit}
                priority={priority}
                {...rest}
            />
        </Wrapper>
    );
};
