import { serverBlocksContent$data } from '../../app/blocks/__generated__/serverBlocksContent.graphql';
import { IApp } from '../../types/base/app';
import { cacheTag } from './tag';

/**
 * @description Cache blocks by tags based on the block content (Strapi relation fields)
 * @param {serverBlocksContent$data[]} blocks - Blocks data
 **/
const cacheBlocks = (blocks: serverBlocksContent$data[] | null | undefined) => {
    blocks?.forEach((block) => {
        switch (block?.__typename) {
            case 'ComponentBlockFormBlock': {
                if (block.form?.documentId) cacheTag('built-form', block.form.documentId);
                break;
            }
            case 'ComponentBlockTemplateBlock': {
                if (block.template?.documentId) cacheTag('template', block.template.documentId);
                cacheBlocks((block.template?.content || []) as serverBlocksContent$data[]);
                break;
            }
            default:
                break;
        }
    });
};

/**
 * @description Cache page by tags based on the page content
 * @param {IApp} app - App data
 **/
export const cachePage = ({ page, webSetting, item }: IApp) => {
    // Set cache tags for global content (AppDataQuery and AppRedirectQuery)
    cacheTag('menu');
    cacheTag('redirect');
    cacheTag('system-resource');
    cacheTag('web-setting');

    // Set cache tags for page content
    if (page) {
        const { documentId, content } = page;

        cacheTag('page', documentId);

        cacheBlocks(content as serverBlocksContent$data[]);
    }

    // Set cache tags for dynamic content
    if (item) {
        switch (item.__typename) {
            case 'Article': {
                const { documentId, category } = item;
                cacheTag('article', documentId);
                if (category?.documentId) cacheTag('article-category', category.documentId);
                break;
            }
            default:
                break;
        }
    }
};
