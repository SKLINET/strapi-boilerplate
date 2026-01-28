import React, { ReactElement } from 'react';
import styles from './Video.module.scss';
import { VideoBlockProps } from '../../../blocks/VideoBlock/VideoBlock';
import { getVideoType } from '../../../../utils/strapi/getVideoType';
import { Video as _Video } from '../../molecules/Video/Video';
import { FadeIn } from '../../base/FadeIn/FadeIn';

const Video = ({ blocksData: { video, anchor }, app }: VideoBlockProps): ReactElement => {
    const _video = getVideoType(video);

    return (
        <FadeIn
            className={styles.wrapper}
            spaceing={{ x: 'base', y: { top: 'large', bottom: 'large' } }}
            anchor={anchor}
        >
            {_video && <_Video data={_video} app={app} sizes="(max-width: 48rem) 100vw, 80vw" />}
        </FadeIn>
    );
};

export { Video };
