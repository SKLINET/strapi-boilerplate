import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { TestBlock_content } from './__generated__/TestBlock_content.graphql';
import { Test } from '../../components/blocks/Test/Test';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TestBlockStaticProps {}

export interface TestBlockContent extends OmitRefType<TestBlock_content> {
    __typename: 'TestBlockRecord';
}

export interface TestBlockProps extends TestBlockStaticProps {
    content: TestBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps>;
    className?: string;
}

graphql`
    fragment TestBlock_content on ComponentBlockTestBlock {
        id
        testText
        testComponent {
            text
            icon {
                ...appIconFragment @relay(mask: false)
            }
        }
        image {
            ...appImageFragment @relay(mask: false)
        }
        article {
            data {
                id
            }
        }
        button {
            ...appButtonFragment @relay(mask: false)
        }
    }
`;

const TestBlock = ({ content, ...otherProps }: TestBlockProps): ReactElement => (
    <Test {...{ ...content, id: undefined, __typename: undefined }} {...otherProps} />
);

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths here
    /*
    TestBlock.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<TestBlockStaticProps> => {
        const provider = providers.x;
        return {};
    };
    */
}

TestBlock.whyDidYouRender = true;

export default TestBlock;
