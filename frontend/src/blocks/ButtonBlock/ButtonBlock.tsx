import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import Button from '../../components/blocks/Button/Button';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { ButtonBlock_content$data } from './__generated__/ButtonBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonBlockStaticProps {}

export interface ButtonBlockContent extends OmitRefType<ButtonBlock_content$data> {
    __typename: 'ComponentBlockButtonBlock';
}

export interface ButtonBlockProps extends ButtonBlockStaticProps {
    blocksData: ButtonBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment ButtonBlock_content on ComponentBlockButtonBlock {
        file {
            ...appImageFragment @relay(mask: false)
        }
        icon {
            ...appIconFragment @relay(mask: false)
        }
        page {
            ...appPageFragment @relay(mask: false)
        }
        label
    }
`;

const ButtonBlock = ({ blocksData, app }: ButtonBlockProps): ReactElement => <Button {...blocksData} />;

ButtonBlock.whyDidYouRender = true;

export default ButtonBlock;
