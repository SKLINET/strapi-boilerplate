import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { TemplateBlockContent, TemplateBlockProps } from '../../../blocks/TemplateBlock/TemplateBlock';

const Button = dynamic(import('../Button/Button'));

export type TemplateProps = {
    blocksData: Omit<TemplateBlockProps, 'content'> & Omit<TemplateBlockContent, 'id' | '__typename'>;
};

const Template = ({ blocksData: { template } }: TemplateProps): ReactElement => {
    if (!template || !template.data || !template.data.attributes || template.data.attributes.content.length === 0)
        return <></>;

    return (
        <>
            {template.data.attributes.content.map((e) => {
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
};

export { Template };
