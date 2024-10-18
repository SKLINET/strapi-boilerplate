import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Field, DateTimePicker, Button } from '@strapi/design-system';
import { Feather } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';

const Root = styled(Field.Root)`
    width: 100%;

    & > * {
        width: 100%;
        flex-direction: column;

        & > * {
            width: 100%;
        }
    }
`;

interface DateInputProps {
    label: string;
    disabled?: boolean;
    initValue?: Date | null;
    onSave?: (date: Date) => void;
}

const DateInput = ({ label, disabled, initValue = null, onSave }: DateInputProps) => {
    const { formatMessage } = useIntl();

    const [value, setValue] = useState<Date | null>(initValue);

    useEffect(() => {
        setValue(initValue || null);
    }, [initValue]);

    return (
        <Flex width="100%" direction="column" gap={1}>
            <Root>
                <Field.Label variant="sigma" textColor="neutral600">
                    {label}
                </Field.Label>
                <DateTimePicker
                    value={value}
                    onChange={(e: Date | undefined) => setValue(e || null)}
                    onClear={() => {}}
                    initialDate={value}
                    disabled={disabled}
                    size="S"
                />
            </Root>
            {onSave && (
                <Button
                    onClick={() => value && onSave(value)}
                    variant="success-light"
                    size="S"
                    startIcon={<Feather />}
                    disabled={!value || disabled}
                    loading={false}
                    width="100%"
                >
                    {formatMessage({
                        id: getTranslation('action.footer.publish.button.save'),
                        defaultMessage: 'Save',
                    })}{' '}
                    {label}
                </Button>
            )}
        </Flex>
    );
};

export default DateInput;
