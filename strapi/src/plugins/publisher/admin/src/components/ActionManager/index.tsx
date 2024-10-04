import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { getTranslation } from '../../utils/getTranslation';
import { Box, Typography, Divider } from '@strapi/design-system';
// import Action from '../Action';
import { useSettings } from '../../hooks/useSettings';

const actionModes = ['publish', 'unpublish'];

const ActionManagerComponent = () => {
    const { formatMessage } = useIntl();
    const context = useContentManagerContext();
    const [showActions, setShowActions] = useState(false);
    const { getSettings } = useSettings();
    // const { isLoading, data, isRefetching } = getSettings();

    /*
    useEffect(() => {
        if (!isLoading && !isRefetching) {
            if (!data.contentTypes?.length || data.contentTypes?.find((uid: any) => uid === context.slug)) {
                setShowActions(true);
            }
        }
    }, [isLoading, isRefetching]);
    */

    if (!showActions) {
        return null;
    }

    return (
        <Box marginTop={8} width="100%">
            <Typography variant="sigma" textColor="neutral600">
                {formatMessage({
                    id: getTranslation('plugin.name'),
                    defaultMessage: 'Publisher',
                })}
            </Typography>
            <Box marginTop={2} marginBottom={4}>
                <Divider />
            </Box>
            <Box spacing={4} marginTop={2}>
                {/* actionModes.map((mode, index) => (
                    <Action mode={mode} key={mode + index} entityId={entity.modifiedData.id} entitySlug={entity.slug} />
                )) */}
            </Box>
        </Box>
    );

    return <></>;
};

const ActionManager = () => {
    const context = useContentManagerContext();

    if (!context.hasDraftAndPublish || context.isCreatingEntry) {
        return null;
    }

    /*
    if (!context?.modifiedData?.id) {
        return null;
    }
    */

    return <ActionManagerComponent />;
};

export default ActionManager;
