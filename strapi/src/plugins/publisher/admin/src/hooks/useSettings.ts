import { useQuery } from 'react-query';
import { useFetchClient } from '@strapi/admin/strapi-admin';

import { PLUGIN_ID } from '../pluginId';

export const useSettings = () => {
    const { get } = useFetchClient();

    function getSettings() {
        return useQuery({
            queryKey: [PLUGIN_ID, 'settings'],
            queryFn: function () {
                return get(`/${PLUGIN_ID}/settings`);
            },
            select: function ({ data }) {
                return data.data || false;
            },
        });
    }

    return {
        getSettings,
    };
};
