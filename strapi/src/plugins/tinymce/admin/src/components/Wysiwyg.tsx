import React from 'react';
import { Field } from '@strapi/design-system';

interface WysiwygProps {
    description?: Record<any, any>;
    disabled?: boolean;
    error?: string;
    intlLabel: Record<any, any>;
    name: string;
    onChange: (e: any) => void;
    required?: boolean;
    value?: any;
}

const Wysiwyg = ({ name, onChange, value, intlLabel, disabled, error, description, required }: WysiwygProps) => {
    //
    return (
        <Field.Root id={name}>
            <Field.Label>{'Ahoj'}</Field.Label>
            <Field.Input type="text" name={name} value={value} onChange={onChange} placeholder={'Hmmm'} />
            <Field.Hint />
            <Field.Error />
        </Field.Root>
    );
};

export default Wysiwyg;
