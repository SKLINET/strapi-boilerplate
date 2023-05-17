import React, { ReactElement, CSSProperties } from 'react';
import NextImage, { StaticImageData, ImageLoaderProps, ImageProps as NextImageProps } from 'next/image';
import { ImgixProps } from '@symbio/headless';
import { kebabCase } from '@symbio/headless/utils';
import { ImageProps as StrapiImageProps } from '../../../types/image';
import { getImageUrl } from '../../../utils/getImageUrl';

export declare type ImageProps = Omit<NextImageProps, 'src'> & {
    imgixParams?: ImgixProps;
    className?: string;
    style?: CSSProperties;
} & (
        | {
              staticImage: StaticImageData | string;
              image?: never;
              src?: never;
          }
        | {
              staticImage?: never;
              image: StrapiImageProps;
              src?: never;
          }
        | {
              staticImage?: never;
              image?: never;
              src: string;
          }
    );

export const serializeImageParams = (
    obj: ImgixProps,
    fp?: {
        readonly x: number | null;
        readonly y: number | null;
    } | null,
): string => {
    const str = [];
    for (const [key, value] of Object.entries(obj)) {
        if (value) {
            str.push(encodeURIComponent(kebabCase(key)) + '=' + encodeURIComponent(value));
        }
    }

    if (fp && obj.crop === 'focalpoint') {
        if (!obj.fpX && fp.x) {
            str.push(`fp-x=${encodeURIComponent(fp.x)}`);
        }
        if (!obj.fpY && fp.y) {
            str.push(`fp-y=${encodeURIComponent(fp.y)}`);
        }
        if (!obj.crop) {
            str.push('crop=focalpoint');
        }
        if (!obj.fit) {
            str.push('fit=crop');
        }
    }

    return str.join('&');
};

const Image = ({
    staticImage,
    image,
    src,
    alt,
    title,
    imgixParams,
    fill,
    width,
    height,
    onContextMenu = (e) => e.preventDefault(),
    className,
    style,
    ...props
}: ImageProps): ReactElement => {
    // Imgix params
    const params = imgixParams
        ? serializeImageParams(imgixParams, { x: imgixParams.fpX || null, y: imgixParams.fpY || null })
        : undefined;

    // Next/image loader
    const myLoader = ({ src, width, quality }: ImageLoaderProps): string =>
        `${src}?w=${width}&q=${quality || 75}${params ? `&${params}` : ''}`;

    const resolveBlurUrl = (url: string, width?: number | null, height?: number | null) => {
        return `${url}?w=50&h=${(50 / ((width || 1) / (height || 1))).toFixed(
            0,
        )}&q=5,loseless=true&auto=format,compress&fit=fillmax`;
    };

    // General props
    const generalProps = {
        title,
        alt,
        onContextMenu,
        className,
        style,
    };

    // Size props
    const sizeProps = fill
        ? {
              fill: true,
              width: undefined,
              height: undefined,
          }
        : {
              fill: false,
              width: image?.data?.attributes?.width || width || 0,
              height: image?.data?.attributes?.height || height || 0,
          };

    // 1) For static images (public folder)
    if (staticImage) {
        // When we provide path to image ("/images/bg.png")
        if (typeof staticImage === 'string') {
            return (
                <NextImage sizes="100vw" {...props} src={staticImage} {...sizeProps} {...generalProps} quality={75} />
            );
        }

        // When we use next image import (import IMAGE from "/images/bg.png")
        return (
            <NextImage
                sizes="100vw"
                {...props}
                src={staticImage}
                {...sizeProps}
                {...generalProps}
                placeholder="blur"
                quality={75}
            />
        );
    }

    // 2) For strapi image
    if (image) {
        const _src = getImageUrl(image.data.attributes.url);

        return (
            <NextImage
                sizes="100vw"
                {...props}
                src={_src}
                {...sizeProps}
                {...generalProps}
                blurDataURL={resolveBlurUrl(_src, image.data.attributes.width, image.data.attributes.height)}
                loader={myLoader}
                quality={75}
                placeholder="blur"
            />
        );
    }

    // 3) When is src property provided
    if (src) {
        const _src = src.startsWith('http://') || src.startsWith('https://') ? src : getImageUrl(src);

        return (
            <NextImage
                sizes="100vw"
                {...props}
                src={_src}
                {...sizeProps}
                {...generalProps}
                blurDataURL={resolveBlurUrl(_src)}
                loader={myLoader}
                quality={75}
                placeholder="blur"
            />
        );
    }

    return <></>;
};

export { Image };
