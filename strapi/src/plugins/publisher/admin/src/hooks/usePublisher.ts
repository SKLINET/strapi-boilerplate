import { useFetchClient } from '@strapi/admin/strapi-admin';
import { PLUGIN_ID } from '../pluginId';

export interface IPublisher {
    getAction: (filters: Record<string, any>) => Promise<IPublisherEntity | null>;
    createAction: (data: Record<string, any>) => Promise<IPublisherEntity | null>;
    updateAction: (documentId: string, data: Record<string, any>) => Promise<IPublisherEntity | null>;
    deleteAction: (documentId: string) => Promise<boolean>;
}

export interface IPublisherEntity {
    id: number;
    documentId: string;
    // Type of action
    mode: 'publish' | 'unpublish';
    // Entity ID
    entityId: string;
    // Date of execution an action
    executeAt: string;
}

export const usePublisher = () => {
    const { get, post, put, del } = useFetchClient();

    const getAction = async (filters: Record<string, any> = {}): Promise<IPublisherEntity | null> => {
        try {
            const response = await get(`/${PLUGIN_ID}/actions`, {
                params: { filters },
            });

            if (!response || !response.data || !response.data.data) throw new Error('Failed to fetch action');

            if (!Array.isArray(response.data.data) || response.data.data.length === 0)
                throw new Error('No action found');

            return response.data.data[0];
        } catch (error) {
            return null;
        }
    };

    const createAction = async (data: Record<string, any>): Promise<IPublisherEntity | null> => {
        try {
            const response = await post(`/${PLUGIN_ID}/actions`, { data: data });

            if (!response || !response.data || !response.data.data) throw new Error('Failed to create action');

            return response.data.data;
        } catch (error) {
            return null;
        }
    };

    const updateAction = async (documentId: string, data: Record<string, any>): Promise<IPublisherEntity | null> => {
        try {
            const response = await put(`/${PLUGIN_ID}/actions/${documentId}`, { data: data });

            if (!response || !response.data || !response.data.data) throw new Error('Failed to update action');

            return response.data.data;
        } catch (error) {
            return null;
        }
    };

    const deleteAction = async (documentId: string): Promise<boolean> => {
        try {
            const response = await del(`/${PLUGIN_ID}/actions/${documentId}`);

            if (response.status !== 204) throw new Error('Failed to delete action');

            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        getAction,
        createAction,
        updateAction,
        deleteAction,
    };
};
