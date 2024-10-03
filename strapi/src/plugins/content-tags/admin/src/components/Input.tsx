import React from 'react';
import { Field, Typography, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import { get } from 'lodash';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { PLUGIN_ID } from '../pluginId';

interface InputProps {
    name: string;
    value?: string;
    onChange: (e: any) => void;
    attribute: Record<any, any>;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    placeholder?: string;
    hint?: string;
}

const Input = ({
    name,
    value,
    onChange,
    attribute,
    required,
    disabled,
    error,
    label,
    placeholder,
    hint,
}: InputProps) => {
    const { formatMessage } = useIntl();

    const fieldPlaceholder = formatMessage({
        id: getTranslation('video-field.placeholder'),
        defaultMessage: 'eg. https://vimeo.com/123456789',
    });

    const context = useContentManagerContext();
    const pluginOptions = get(context, `contentType.pluginOptions.${PLUGIN_ID}`) as Record<any, any>;
    const tagsEnabled = !!pluginOptions;

    return (
        <Field.Root id={name} name={name} error={error} disabled={disabled} required={required} hint={hint}>
            <Field.Label>{label}</Field.Label>
            {!tagsEnabled ? (
                <Typography fontWeight="bold">Invalid scheme configuration</Typography>
            ) : (
                <SingleSelect
                    placeholder={placeholder}
                    aria-label={label}
                    aria-disabled={disabled}
                    disabled={disabled}
                    value={value || pluginOptions?.defaultTag}
                    onChange={(newValue: any) => {
                        onChange({
                            target: {
                                name,
                                value: newValue,
                                type: attribute.type,
                            },
                        });
                    }}
                >
                    {Object.keys(pluginOptions.tags).map((tagKey) => (
                        <SingleSelectOption key={tagKey} value={tagKey}>
                            {tagKey}
                        </SingleSelectOption>
                    ))}
                </SingleSelect>
            )}
            <Field.Hint />
            <Field.Error />
        </Field.Root>
    );
};

export default Input;
