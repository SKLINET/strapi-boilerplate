import React, { useState, useEffect } from 'react';
import { Flex, Button } from '@strapi/design-system';
import { Check, Cross, Pencil, Trash } from '@strapi/icons';
import { unstable_useContentManagerContext as useContentManagerContext, useNotification } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';
import DateInput from '../DateInput/DateInput';
import { AppProps } from '../ActionManager';
import { IPublisherEntity } from '../../hooks/usePublisher';

type Props = AppProps & { type: 'publish' | 'unpublish' };

const ActionController = ({ type, publisher, settings }: Props) => {
    const [actionEntity, setActionEntity] = useState<IPublisherEntity | null>(null);

    const [showInput, setShowInput] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    const context = useContentManagerContext();
    const { formatMessage } = useIntl();
    const { toggleNotification } = useNotification();

    // GET
    // Fetch the action (cron job in Strapi) for the current entity
    useEffect(() => {
        const fetchAction = async () => {
            setLoading(true);

            const response = await publisher.getAction({
                mode: type,
                entityId: context.id,
                entitySlug: context.form?.values?.slug || '',
            });

            setActionEntity(response);
            setLoading(false);
        };

        fetchAction();
    }, []);

    // POST
    // Create an action (cron job in Strapi) for the current entity
    const createAction = async (date: Date) => {
        setLoading(true);

        const response = await publisher.createAction({
            mode: type,
            entityId: context.id,
            entitySlug: context.slug,
            executeAt: date,
        });

        if (response) {
            setActionEntity(response);
            toggleNotification({
                type: 'success',
                message: formatMessage({
                    id: getTranslation(`action.notification.${type}.create.success`),
                    defaultMessage: `${type} action created successfully`,
                }),
            });
        } else {
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: getTranslation('action.notification.error'),
                    defaultMessage: 'An error occurred',
                }),
            });
        }

        setLoading(false);
    };

    // PUT
    // Update an action (cron job in Strapi) for the current entity
    const updateAction = async (documentId: string, date: Date) => {
        setLoading(true);

        const response = await publisher.updateAction(documentId, { executeAt: date });

        if (response) {
            setActionEntity(response);
            setEdit(false);
            toggleNotification({
                type: 'success',
                message: formatMessage({
                    id: getTranslation(`action.notification.${type}.update.success`),
                    defaultMessage: `${type} action updated successfully`,
                }),
            });
        } else {
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: getTranslation('action.notification.error'),
                    defaultMessage: 'An error occurred',
                }),
            });
        }

        setLoading(false);
    };

    // DELETE
    // Delete an action (cron job in Strapi) for the current entity
    const deleteAction = async (documentId: string) => {
        setLoading(true);

        const response = await publisher.deleteAction(documentId);

        if (response) {
            setActionEntity(null);
            setEdit(false);
            setShowInput(false);
            toggleNotification({
                type: 'success',
                message: formatMessage({
                    id: getTranslation(`action.notification.${type}.delete.success`),
                    defaultMessage: `${type} action deleted successfully`,
                }),
            });
        } else {
            toggleNotification({
                type: 'danger',
                message: formatMessage({
                    id: getTranslation('action.notification.error'),
                    defaultMessage: 'An error occurred',
                }),
            });
        }

        setLoading(false);
    };

    const disabled = loading || context.form.disabled || context.isLoading;

    const allowToEdit = !!actionEntity && !edit;

    return (
        <Flex width="100%" direction="column" gap={1}>
            {showInput || actionEntity ? (
                <>
                    <DateInput
                        label={formatMessage({
                            id: getTranslation(`action.header.${type}.title`),
                            defaultMessage: `${type} date`,
                        })}
                        disabled={disabled || allowToEdit}
                        initValue={actionEntity ? new Date(actionEntity.executeAt) : null}
                        onSave={
                            !allowToEdit
                                ? (date) => {
                                      if (actionEntity) {
                                          updateAction(actionEntity.documentId, date);
                                      } else {
                                          createAction(date);
                                      }
                                  }
                                : undefined
                        }
                    />
                    {allowToEdit && (
                        <Button
                            onClick={() => setEdit(true)}
                            variant="tertiary"
                            size="S"
                            startIcon={<Pencil />}
                            disabled={disabled}
                            width="100%"
                        >
                            {formatMessage({
                                id: getTranslation('action.footer.publish.button.edit'),
                                defaultMessage: 'Edit',
                            })}{' '}
                            {formatMessage({
                                id: getTranslation(`action.header.${type}.title`),
                                defaultMessage: `${type} date`,
                            })}
                        </Button>
                    )}
                    {actionEntity && (
                        <Button
                            onClick={() => deleteAction(actionEntity.documentId)}
                            variant="danger-light"
                            size="S"
                            startIcon={<Trash />}
                            disabled={disabled}
                            width="100%"
                        >
                            {formatMessage({
                                id: getTranslation('action.footer.publish.button.delete'),
                                defaultMessage: 'Delete',
                            })}{' '}
                            {formatMessage({
                                id: getTranslation(`action.header.${type}.title`),
                                defaultMessage: `${type} date`,
                            })}
                        </Button>
                    )}
                </>
            ) : (
                <Button
                    onClick={() => setShowInput(true)}
                    variant={type === 'publish' ? 'default' : 'secondary'}
                    size="S"
                    startIcon={type === 'publish' ? <Check /> : <Cross />}
                    disabled={disabled}
                    width="100%"
                >
                    {formatMessage({
                        id: getTranslation(`action.footer.${type}.button.add`),
                        defaultMessage: `${type} date`,
                    })}
                </Button>
            )}
        </Flex>
    );
};

export default ActionController;
