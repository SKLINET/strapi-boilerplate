import React from 'react';
import { useIntl } from 'react-intl';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { getTranslation } from '../../utils/getTranslation';
import { Box, Typography, Divider, Flex } from '@strapi/design-system';
import ActionController from '../ActionController/ActionController';
import UnpublishAction from '../UnpublishAction/UnpublishAction';
import { ISettings, useSettings } from '../../hooks/useSettings';
import { IPublisher, usePublisher } from '../../hooks/usePublisher';

export interface AppProps {
    publisher: IPublisher;
    settings: ISettings;
}

const ActionManagerComponent = (props: AppProps) => {
    const context = useContentManagerContext();
    const { formatMessage } = useIntl();

    // Do not show when publishing is not available
    if (!context.hasDraftAndPublish || context.isCreatingEntry) {
        return <></>;
    }

    // Do not show when the current content type is a single type
    if (context.isSingleType) return <></>;

    // Do not show when the entity is not created yet
    if (!context.id) {
        return <></>;
    }

    return (
        <Box marginTop={4} width="100%">
            <Typography variant="sigma" textColor="neutral600">
                {formatMessage({
                    id: getTranslation('plugin.name'),
                    defaultMessage: 'Publisher',
                })}
            </Typography>
            <Box marginTop={2} marginBottom={4}>
                <Divider />
            </Box>
            <Flex spacing={4} marginTop={2} direction="column" alignItems="start" gap={2}>
                <ActionController type="publish" {...props} />
                <ActionController type="unpublish" {...props} />
            </Flex>
        </Box>
    );
};

const ActionManager = () => {
    const settings = useSettings();
    const publisher = usePublisher();

    // Do not show when settings are loading
    if (!settings || settings.isLoading || settings.isRefetching) return <></>;

    return <ActionManagerComponent publisher={publisher} settings={settings} />;
};

export default ActionManager;
