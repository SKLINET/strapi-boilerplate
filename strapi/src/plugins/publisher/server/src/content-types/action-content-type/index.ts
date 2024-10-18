'use strict';

export default {
    kind: 'collectionType',
    collectionName: 'actions',
    info: {
        singularName: 'action',
        pluralName: 'actions',
        displayName: 'Plugin - Publisher',
    },
    pluginOptions: {
        'content-manager': {
            visible: true,
        },
        'content-type-builder': {
            visible: true,
        },
    },
    options: {
        draftAndPublish: false,
        comment: '',
    },
    attributes: {
        executeAt: {
            type: 'datetime',
        },
        mode: {
            type: 'string',
        },
        entityId: {
            type: 'string',
        },
        entitySlug: {
            type: 'string',
        },
    },
};
