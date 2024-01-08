import React, { ReactElement } from 'react';
import { TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';

import VideoBlock from '../../../blocks/VideoBlock/VideoBlock';

const Template = ({ blocksData, app }: TemplateBlockProps): ReactElement => (
    <>
        {blocksData.template?.data?.attributes?.content?.map((e) => {
            if (!e) return null;
            switch (e.__typename) {
                case 'ComponentBlockVideoBlock':
                    return <VideoBlock key={e.id} blocksData={e} app={app} />;
                default:
                    return null;
            }
        })}
    </>
);

export { Template };
