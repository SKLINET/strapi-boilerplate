import React, { ReactElement } from 'react';
import styles from './Video.module.scss';
import { VideoBlockProps } from '../../../blocks/VideoBlock/VideoBlock';
import { getVideoType } from '../../../../utils/strapi/getVideoType';
import { Video as _Video } from '../../molecules/Video/Video';

const Video = ({ blocksData: { video }, app }: VideoBlockProps): ReactElement => {
    const _video = getVideoType(video);
    return <section className={styles.wrapper}>{_video && <_Video data={_video} />}</section>;
};

export { Video };
