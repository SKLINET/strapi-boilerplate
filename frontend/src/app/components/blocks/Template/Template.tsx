import React, { ReactElement } from 'react';
import { TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';

const Template = ({ blocksData, app }: TemplateBlockProps): ReactElement => (
    <>
        {blocksData.template?.data?.attributes?.content?.map((e) => {
            if (!e) return null;
            switch (e.__typename) {
                default:
                    return null;
            }
        })}
    </>
);

export { Template };
