import React, { ReactElement } from 'react';
import NextImage, { ImageLoaderProps, ImageProps as NextImageProps } from 'next/legacy/image';
import { ImgixProps } from '@symbio/headless';
import { kebabCase } from '@symbio/headless/utils';
import { ImageProps as StrapiImageProps } from '../../../types/image';
import { getImageUrl } from '../../../utils/getImageUrl';

export declare type ImageProps = Omit<NextImageProps, 'src'> & {
    imgixParams?: ImgixProps;
} & (
        | {
              image: StrapiImageProps;
              src?: never;
          }
        | {
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
    objectFit?: NextImageProps['objectFit'],
): string => {
    const str = [];
    for (const [key, value] of Object.entries(obj)) {
        if (value) {
            str.push(encodeURIComponent(kebabCase(key)) + '=' + encodeURIComponent(value));
        }
    }

    if (fp && (objectFit !== 'cover' || obj.crop === 'focalpoint')) {
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

export const Image = ({
    image,
    src,
    alt,
    title,
    layout,
    width,
    height,
    imgixParams,
    onContextMenu = (e) => e.preventDefault(),
    ...props
}: ImageProps): ReactElement | null => {
    const params = imgixParams
        ? serializeImageParams(imgixParams, image?.data?.attributes?.focalPoints, props.objectFit)
        : undefined;

    const imageUrl = getImageUrl(image?.data?.attributes?.url);

    const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `${src}?auto=format,compress&w=${width}&q=${quality || 75}${params ? `&${params}` : ''}`;
    };

    // 1) if no image is passed, use src and directly next/image
    if (!image?.data?.attributes?.url) {
        if (src) {
            const nextImageProps: NextImageProps = {
                ...props,
                src,
                alt,
                title,
                layout,
                ...((typeof width === 'string' || typeof width === 'number') && layout !== 'fill' ? { width } : {}),
                ...((typeof height === 'string' || typeof height === 'number') && layout !== 'fill' ? { height } : {}),
                loader: myLoader,
            } as NextImageProps;
            return <NextImage onContextMenu={onContextMenu} {...nextImageProps} />;
        } else {
            return null;
        }
    }

    if (layout !== 'fill') {
        // 2) if width and height are passed use it to size image
        if (
            (typeof width === 'string' || typeof width === 'number') &&
            (typeof height === 'string' || typeof height === 'number')
        ) {
            return (
                <NextImage
                    src={imageUrl}
                    alt={alt || image?.data?.attributes?.alternativeText || ''}
                    title={title || undefined}
                    layout={layout}
                    width={width}
                    height={height}
                    loader={myLoader}
                    onContextMenu={onContextMenu}
                    {...(props as Omit<NextImageProps, 'src'> & { placeholder: 'blur'; blurDataURL: string })}
                />
            );
        }

        // 3) if image has width and height, pass it to the next image with default layout responsive
        if (typeof image?.data?.attributes?.width === 'number' && typeof image?.data?.attributes?.height === 'number') {
            return (
                <NextImage
                    src={imageUrl}
                    alt={alt || image?.data?.attributes?.url || ''}
                    title={title || undefined}
                    layout={layout}
                    width={image?.data?.attributes.width}
                    height={image?.data?.attributes.height}
                    loader={myLoader}
                    onContextMenu={onContextMenu}
                    {...(props as Omit<NextImageProps, 'src'> & { placeholder: 'blur'; blurDataURL: string })}
                />
            );
        }
    }

    // 4) otherwise (no width & height) use layout fill
    return (
        <NextImage
            src={imageUrl}
            alt={alt || image?.data?.attributes?.alternativeText || ''}
            title={title || undefined}
            layout={'fill' as ImageProps['layout']}
            loader={myLoader}
            onContextMenu={onContextMenu}
            {...(props as Omit<NextImageProps, 'src'> & {
                placeholder: 'blur';
                blurDataURL: string;
                width: number;
                height: number;
            })}
        />
    );
};

Image.whyDidYouRender = true;
