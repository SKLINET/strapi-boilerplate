import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import { graphql } from 'react-relay';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { {BLOCK_NAME}_content } from './__generated__/{BLOCK_NAME}_content.graphql';
import { {COMPONENT_NAME} } from '../../components/blocks/{COMPONENT_NAME}/{COMPONENT_NAME}';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface {BLOCK_NAME}StaticProps {}

export interface {BLOCK_NAME}Content extends OmitRefType<{BLOCK_NAME}_content> {
    __typename: 'ComponentBlock{BLOCK_NAME}';
}

export interface {BLOCK_NAME}Props extends {BLOCK_NAME}StaticProps {
    content: {BLOCK_NAME}Content;
    app?: AppContextProps<PageProps, WebSettingsProps>;
    className?: string;
}

graphql`
    fragment {BLOCK_NAME}_content on ComponentBlock{BLOCK_NAME} {
        id
        {FIELDS}
}
`;

const {BLOCK_NAME} = ({ content, ...otherProps }: {BLOCK_NAME}Props): ReactElement => (
    <{COMPONENT_NAME} {...{ ...content, id: undefined, __typename: undefined }} {...otherProps} />
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

{BLOCK_NAME}.whyDidYouRender = config.whyDidYouRender.active;

export default {BLOCK_NAME};
