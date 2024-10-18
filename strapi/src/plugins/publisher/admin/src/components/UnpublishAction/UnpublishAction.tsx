import React, { useState } from 'react';
import { Box, Button } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';
import DateInput from '../DateInput/DateInput';
import { AppProps } from '../ActionManager';

const UnpublishAction = ({ publisher, settings }: AppProps) => {
    const context = useContentManagerContext();

    const [showInput, setShowInput] = useState(false);

    const { formatMessage } = useIntl();

    const disabled = context.form.disabled || context.isLoading;

    return (
        <Box width="100%">
            {showInput ? (
                <DateInput
                    label={formatMessage({
                        id: getTranslation('action.header.unpublish.title'),
                        defaultMessage: 'unpublish date',
                    })}
                    disabled={disabled}
                    onSave={(date) => {
                        //
                    }}
                />
            ) : (
                <Button
                    onClick={() => setShowInput(true)}
                    variant="secondary"
                    size="S"
                    startIcon={<Cross />}
                    disabled={disabled}
                    width="100%"
                >
                    {formatMessage({
                        id: getTranslation('action.footer.unpublish.button.add'),
                        defaultMessage: 'Unpublish date',
                    })}
                </Button>
            )}
        </Box>
    );
};

export default UnpublishAction;
