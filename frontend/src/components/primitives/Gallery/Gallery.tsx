import React, { useState } from 'react';
import { GalleryBlock_content$data } from '../../../blocks/GalleryBlock/__generated__/GalleryBlock_content.graphql';

import { Image } from '../Image/Image';
import { getImageUrl } from '../../../utils/getImageUrl';
import Lightbox from 'react-18-image-lightbox';

export interface GalleryProps {
    data: GalleryBlock_content$data['assets'];
}

const Gallery = ({ data }: GalleryProps): JSX.Element => {
    const images = data?.data || [];

    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);
    const activeImageUrl = getImageUrl(images[active]?.attributes?.url);
    return (
        <div className="w-full h-80 flex flex-row flex-wrap -ml-4 -mt-4 -mr-4 justify-center">
            {Array.isArray(images) &&
                images.map((item, index) => {
                    const image = { data: item };
                    return (
                        <div
                            key={`gallery-image_${index}`}
                            onClick={() => {
                                setIsOpen(true);
                                setActive(index);
                            }}
                            className="relative m-4 cursor-pointer object-cover flex-grow-0 flex-shrink-0"
                        >
                            <Image image={image} alt="Image" />
                        </div>
                    );
                })}
            {isOpen && (
                <Lightbox
                    mainSrc={activeImageUrl}
                    nextSrc={active < images.length - 1 ? images[active + 1]?.attributes?.url : undefined}
                    prevSrc={active > 0 ? images[active - 1]?.attributes?.url : undefined}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => active > 0 && setActive(active - 1)}
                    onMoveNextRequest={() => active < images.length - 1 && setActive(active + 1)}
                />
            )}
        </div>
    );
};

Gallery.whyDidYouRender = true;

export { Gallery };
