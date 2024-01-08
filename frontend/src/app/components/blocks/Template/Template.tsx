import React, { ReactElement } from 'react';
import { TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';

import ContactFormBlock from '../../../blocks/ContactFormBlock/ContactFormBlock';
import VideoBlock from '../../../blocks/VideoBlock/VideoBlock';

const Template = ({ blocksData, app }: TemplateBlockProps): ReactElement => (
    <>
        {blocksData.template?.data?.attributes?.content?.map((e) => {
            if (!e) return null;
            switch (e.__typename) {
                case 'ComponentBlockContactFormBlock':
                    return <ContactFormBlock key={e.id} blocksData={e} app={app} />;
                case 'ComponentBlockVideoBlock':
                    return <VideoBlock key={e.id} blocksData={e} app={app} />;
                default:
                    return null;
            }
        })}
    </>
);

export { Template };
