import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFetchClient, useNotification } from '@strapi/admin/strapi-admin';

import { PLUGIN_ID } from '../pluginId';
// import { getTranslation } from '../utils/getTranslation';

const buildQueryKey = (args: any) => {
    return args.filter((a: any) => a);
};

export const usePublisher = () => {
    const { toggleNotification } = useNotification();
    const { del, post, put, get } = useFetchClient();
    const queryClient = useQueryClient();

    function onSuccessHandler({ queryKey, notification }: any) {
        queryClient.invalidateQueries(queryKey);
        toggleNotification({
            type: notification.type,
            // message: { id: getTranslation(notification.tradId) },
            message: 'Success',
        });
    }

    function onErrorHandler(error: any) {
        toggleNotification({
            type: 'warning',
            message: error.response?.error?.message || error.message || { id: 'notification.error' },
        });
    }

    function getAction(filters: any = {}) {
        return useQuery({
            queryKey: buildQueryKey([PLUGIN_ID, 'entity-action', filters.entityId, filters.sentitySlug, filters.mode]),
            queryFn: function () {
                return get(`/${PLUGIN_ID}/actions`, {
                    params: { filters },
                });
            },
            select: function ({ data }) {
                return data.data[0] || false;
            },
        });
    }

    const { mutateAsync: createAction } = useMutation({
        mutationFn: function (body) {
            return post(`/${PLUGIN_ID}/actions`, { data: body });
        },
        onSuccess: ({ data: response }) => {
            const { data } = response;
            const queryKey = buildQueryKey([
                PLUGIN_ID,
                'entity-action',
                data.attributes.entityId,
                data.attributes.entitySlug,
                data.attributes.mode,
            ]);

            onSuccessHandler({
                queryKey,
                notification: {
                    type: 'success',
                    tradId: `action.notification.${data.attributes.mode}.create.success`,
                },
            });
        },
        onError: onErrorHandler,
    });

    const { mutateAsync: updateAction } = useMutation({
        mutationFn: function ({ id, body }: any) {
            return put(`/${PLUGIN_ID}/actions/${id}`, { data: body });
        },
        onSuccess: ({ data: response }) => {
            const { data } = response;
            const queryKey = buildQueryKey([
                PLUGIN_ID,
                'entity-action',
                data.attributes.entityId,
                data.attributes.entitySlug,
                data.attributes.mode,
            ]);

            onSuccessHandler({
                queryKey,
                notification: {
                    type: 'success',
                    tradId: `action.notification.${data.attributes.mode}.update.success`,
                },
            });
        },
        onError: onErrorHandler,
    });

    const { mutateAsync: deleteAction } = useMutation({
        mutationFn: function ({ id }: any) {
            return del(`/${PLUGIN_ID}/actions/${id}`);
        },
        onSuccess: ({ data: response }) => {
            const { data } = response;
            const queryKey = buildQueryKey([
                PLUGIN_ID,
                'entity-action',
                data.attributes.entityId,
                data.attributes.entitySlug,
                data.attributes.mode,
            ]);

            onSuccessHandler({
                queryKey,
                notification: {
                    type: 'success',
                    tradId: `action.notification.${data.attributes.mode}.delete.success`,
                },
            });
        },
        onError: onErrorHandler,
    });

    return { getAction, createAction, updateAction, deleteAction };
};
