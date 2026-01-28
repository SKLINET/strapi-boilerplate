'use client';

import React, { ReactElement, CSSProperties } from 'react';
import NextImage, { StaticImageData, ImageLoaderProps, ImageProps as NextImageProps } from 'next/image';
import { IImage } from '../../../../types/image';
import { getImageUrl } from '../../../../utils/getImageUrl';
import { useBlurDataUrl } from '../../../../utils/cloudinary/useBlurDataUrl';
import { ImgixProps } from '../../../../types/base/imgix';
import { kebabCase } from '../../../../utils/base/kebabCase';
import { transformCloudinaryUrl } from '../../../../utils/cloudinary/cloudinaryUrl';

export declare type ImageProps = Omit<NextImageProps, 'src'> & {
    imgixParams?: ImgixProps;
    placeholder?: 'empty' | 'blur';
    sizes?: string;
    quality?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
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
              image: IImage;
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

const MAX_IMAGE_WIDTH = 2560;

const Image = ({
    staticImage,
    image,
    src,
    alt,
    title,
    imgixParams,
    placeholder = 'empty',
    sizes = '100vw',
    quality = 75,
    priority = false,
    loading = 'lazy',
    fill,
    width,
    height,
    onContextMenu = (e) => e.preventDefault(),
    className,
    style,
    ...props
}: ImageProps): ReactElement => {
    const maxWidth = image?.width ? image.width : width ? Number(width) : MAX_IMAGE_WIDTH;

    // Next/image loader
    const myLoader = ({ src, width }: ImageLoaderProps) => {
        // Cloudinary optimization
        if (src.includes('res.cloudinary') || src.includes('web-assets')) {
            const [prefix, suffix] = src.split('upload');
            if (!suffix) return src;

            const _w = Math.min(width, maxWidth, MAX_IMAGE_WIDTH).toString();

            const transformations = ['f_auto', 'fl_lossy', 'c_limit', `w_${_w}`, 'dpr_auto', `q_${quality}`].join(',');

            return transformCloudinaryUrl(`${prefix}upload/${transformations}${suffix}`);
        }

        // Image from Strapi
        if (src.includes('uploads')) {
            return src;
        }

        return src;
    };

    // BlurDataURL to strapi image
    const blurDataURL = useBlurDataUrl({ image, allow: placeholder === 'blur' });

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
              width: image?.width || width || 0,
              height: image?.height || height || 0,
          };

    // 1) For static images (public folder)
    if (staticImage) {
        // When we provide path to image ("/images/bg.png")
        if (typeof staticImage === 'string') {
            return (
                <NextImage
                    {...props}
                    src={staticImage}
                    {...sizeProps}
                    {...generalProps}
                    sizes={sizes}
                    quality={quality}
                    priority={priority}
                    loading={loading}
                />
            );
        }

        // When we use next image import (import IMAGE from "/images/bg.png")
        return (
            <NextImage
                {...props}
                src={staticImage}
                {...sizeProps}
                {...generalProps}
                placeholder={placeholder}
                sizes={sizes}
                quality={quality}
                priority={priority}
                loading={loading}
            />
        );
    }

    // 2) For strapi image
    if (image) {
        const { url, alternativeText } = image;

        return (
            <NextImage
                {...props}
                src={url}
                {...sizeProps}
                {...generalProps}
                blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
                placeholder={placeholder}
                loader={myLoader}
                sizes={sizes}
                quality={quality}
                priority={priority}
                loading={loading}
                alt={alternativeText}
            />
        );
    }

    // 3) When is src property provided
    if (src) {
        const _src = src.startsWith('http://') || src.startsWith('https://') ? src : getImageUrl(src);

        return (
            <NextImage
                {...props}
                src={_src}
                {...sizeProps}
                {...generalProps}
                placeholder="empty"
                loader={myLoader}
                sizes={sizes}
                quality={quality}
                priority={priority}
                loading={loading}
            />
        );
    }

    return <></>;
};

export { Image };
