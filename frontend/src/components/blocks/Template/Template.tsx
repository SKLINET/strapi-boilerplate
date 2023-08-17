import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';

const ButtonBlock = dynamic(() => import('../../../blocks/ButtonBlock/ButtonBlock'));

export interface TemplateProps {
    blocksData: TemplateBlockProps['blocksData'];
    app: TemplateBlockProps['app'];
}

const Template = ({ blocksData, app }: TemplateProps): ReactElement => (
    <>
        {blocksData.template?.data?.attributes?.content?.map((e) => {
            if (!e) return null;
            switch (e.__typename) {
                case 'ComponentBlockButtonBlock':
                    return <ButtonBlock key={e.id} blocksData={e} app={app} />;
                default:
                    return null;
            }
        })}
    </>
);

export { Template };
