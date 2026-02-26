import { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { FormBlock_content$data } from './__generated__/FormBlock_content.graphql';
import { Form } from '../../components/blocks/Form/Form';
import { IApp } from '../../../types/base/app';
import { cacheTag } from '../../../utils/cache/tag';

export interface FormBlockStaticProps {}

export interface FormBlockContent extends Omit<FormBlock_content$data, ' $fragmentType'> {
    __typename: 'ComponentBlockFormBlock';
}

export interface FormBlockProps extends FormBlockStaticProps {
    blocksData: Omit<FormBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment FormBlock_content on ComponentBlockFormBlock {
        id
        form {
            ...appBuiltFormFragment @relay(mask: false)
        }
        sendEmail {
            ...appSendEmailFragment @relay(mask: false)
        }
        anchor
    }
`;

const FormBlock = (props: FormBlockProps): ReactElement => {
    if (props?.blocksData?.form?.documentId) {
        cacheTag('form-builder', props.blocksData.form.documentId);
    }

    return <Form {...props} />;
};

export default FormBlock;
