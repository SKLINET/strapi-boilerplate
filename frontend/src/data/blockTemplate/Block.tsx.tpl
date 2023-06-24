import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { OmitRefType } from '@symbio/headless';
import { {BLOCK_NAME}_content$data } from './__generated__/{BLOCK_NAME}_content.graphql';
import { {COMPONENT_NAME} } from '../../components/blocks/{COMPONENT_NAME}/{COMPONENT_NAME}';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface {BLOCK_NAME}StaticProps {}

export interface {BLOCK_NAME}Content extends OmitRefType<{BLOCK_NAME}_content$data> {
    __typename: 'ComponentBlock{BLOCK_NAME}';
}

export interface {BLOCK_NAME}Props extends {BLOCK_NAME}StaticProps {
    content: {BLOCK_NAME}Content;
    app?: IApp;
    className?: string;
}

graphql`
    fragment {BLOCK_NAME}_content on ComponentBlock{BLOCK_NAME} {
        id
        {FIELDS}
}
`;

const {BLOCK_NAME} = ({ blocksData, app }: {BLOCK_NAME}Props): ReactElement => (
    <{COMPONENT_NAME} blocksData={blocksData} app={app} />
);

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths here
    /*
    {BLOCK_NAME}.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<{BLOCK_NAME}StaticProps> => {
        const provider = providers.x;
        return {};
    };
    */
}

{BLOCK_NAME}.whyDidYouRender = true;

export default {BLOCK_NAME};
