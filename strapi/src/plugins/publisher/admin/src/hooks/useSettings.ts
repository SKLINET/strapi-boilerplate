import { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';
import { PLUGIN_ID } from '../pluginId';

export interface ISettings {
    isLoading: boolean;
    isRefetching: boolean;
    data: {
        actions: any;
        components: {
            dateTimePicker: {
                step: number;
            };
        };
        hooks: any;
    } | null;
}

export const useSettings = () => {
    const [data, setData] = useState<ISettings | null>(null);

    const { get } = useFetchClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get(`/${PLUGIN_ID}/settings`);

                if (response.data) {
                    setData({
                        ...response.data,
                        isLoading: response.data?.isLoading || false,
                        isRefetching: response.data?.isRefetching || false,
                    });
                } else {
                    setData(null);
                }
            } catch (error) {
                setData(null);
            }
        };

        fetchData();
    }, []);

    return data;
};
