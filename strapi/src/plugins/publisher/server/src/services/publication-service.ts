'use strict';

import { getPluginEntityUid } from '../utils/getEntityUId';
import { Core } from '@strapi/strapi';
import dayjs from 'dayjs';

const actionUId = getPluginEntityUid('action');

interface IRecord {
    id: number;
    documentId: string;
    executeAt: string;
    mode: 'publish' | 'unpublish';
    entityId: string;
    entitySlug: string;
    entityUid: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    /**
     * Publish a single record
     *
     */
    async publish(uid, entityId) {
        await strapi.documents(uid).publish({
            documentId: entityId,
            locale: '*',
        });
    },

    /**
     * Unpublish a single record
     *
     */
    async unpublish(uid, entityId) {
        await strapi.documents(uid).unpublish({
            documentId: entityId,
            locale: '*',
        });
    },

    /**
     * Toggle a records publication state
     *
     */
    async toggle(record: IRecord, mode: 'publish' | 'unpublish') {
        // handle single content type, id is always null
        const entityId = record.entityId || null;

        // uid of entity
        const entitySlug = record.entitySlug || null;

        if (!entitySlug) return;

        const entity = await strapi.documents(entitySlug as any).findOne({
            documentId: entityId,
        });

        // ensure entity exists before attempting mutations.
        if (!entity) {
            return;
        }

        const executeAt = record.executeAt ? dayjs(record.executeAt) : null;

        if (!executeAt || executeAt.isAfter(dayjs())) return;

        switch (mode) {
            case 'publish': {
                await this.publish(entitySlug, entityId);
                break;
            }
            case 'unpublish': {
                await this.unpublish(entitySlug, entityId);
                break;
            }
            default:
                return;
        }

        // remove any used actions
        strapi.documents(actionUId as any).delete({
            documentId: record.documentId,
        });
    },
});
