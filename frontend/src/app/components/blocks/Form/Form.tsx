import React, { ReactElement } from 'react';
import styles from './Form.module.scss';
import { FormBlockProps } from '../../../blocks/FormBlock/FormBlock';
import { FadeIn } from '../../base/FadeIn/FadeIn';
import { getSendEmailType } from '../../../../utils/strapi/getSendEmailType';
import { FormBuilder } from '../../organisms/FormBuilder/FormBuilder';
import { getBuiltFormType } from '../../../../utils/strapi/getBuiltFormType';

const Form = ({ blocksData: { form, sendEmail }, app }: FormBlockProps): ReactElement => {
    const _form = getBuiltFormType(form);
    const _sendEmail = getSendEmailType(sendEmail);

    if (!_form) return <></>;

    return (
        <FadeIn className={styles.wrapper}>
            <FormBuilder data={_form} app={app} sendEmail={_sendEmail} />
        </FadeIn>
    );
};

export { Form };
