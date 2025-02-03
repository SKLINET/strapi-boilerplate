import React, { ReactElement } from 'react';
import { TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';
import { Blocks } from '../../base/Blocks/Blocks';

const Template = ({ blocksData, app, data }: TemplateBlockProps): ReactElement => {
    if (!blocksData?.template?.content) return <></>;
    return <Blocks blocksData={blocksData.template.content} app={app} initialProps={data} />;
};

export { Template };
