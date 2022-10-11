import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import Button from '../../components/blocks/Button/Button';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment ButtonBlock_content on ComponentBlockButtonBlock {
        file {
            data {
                attributes {
                    url
                    width
                    height
                    alternativeText
                }
            }
        }
        icon {
            data {
                attributes {
                    codename
                }
            }
        }
        page {
            data {
                attributes {
                    url
                }
            }
        }
        label
    }
`;

const ButtonBlock = ({ blocksData, ...otherProps }: BaseBlockProps): ReactElement => <Button {...blocksData} />;

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths here
}

ButtonBlock.whyDidYouRender = true;

export default ButtonBlock;
