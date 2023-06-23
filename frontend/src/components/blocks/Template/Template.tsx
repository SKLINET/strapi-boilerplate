import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';

const Button = dynamic(() => import('../Button/Button'));

// eslint-disable-next-line @typescript-eslint/ban-types
export type TemplateProps = TemplateBlockProps & {};

const Template = ({ blocksData, app }: TemplateProps): ReactElement => (
    <>
        {blocksData.template?.data?.attributes?.content.map((e) => {
            if (!e) return null;
            switch (e.__typename) {
                case 'ComponentBlockButtonBlock':
                    return <Button {...e} />;
                default:
                    return null;
            }
        })}
    </>
);

export { Template };
