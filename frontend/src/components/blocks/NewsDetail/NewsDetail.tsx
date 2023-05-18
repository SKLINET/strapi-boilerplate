import React, { ReactElement } from 'react';
import config from '../../../../sklinet.config.json';
import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Heading } from '../../primitives/Heading/Heading';
import { RichText } from '../../primitives/RichText/RichText';

// const Blocks = dynamic<BlocksProps>(() => import('../../base/Blocks/Blocks').then((mod) => mod.Blocks));

export type NewsDetailProps = any;

const NewsDetail = ({ item, app }: NewsDetailProps): ReactElement => {
    dayjs.extend(utc);
    dayjs.extend(timeZone);
    return (
        <>
            <Heading tag={'h1'}>{item.title}</Heading>
            <div className="text-base italic">
                {/* {dayjs.tz(String(item?.date), config.tz).format()} */}
                {item?.perex && <RichText content={item.perex} />}
            </div>
            {/* {app && item?.content && <Blocks blocksData={item.content} initialProps={{}} app={app} />} */}
        </>
    );
};

NewsDetail.whyDidYouRender = config.whyDidYouRender.active;

export { NewsDetail };
