'use client';

import { articleFragment$data } from '../../../relay/__generated__/articleFragment.graphql';
import { IArticle } from '../../../types/article';
import { IMapperConfig } from '../../../types/base/mapper';
import { getImageType } from '../../../utils/strapi/getImageType';
import StrapiMapper from '../StrapiMapper';

type Old = Omit<articleFragment$data, ' $fragmentType'>;
type New = IArticle;

export default class ArticleMapper extends StrapiMapper<Old, New> {
    public constructor(config: IMapperConfig) {
        super(config);
    }

    getOne(e: Old | null | undefined): New | null {
        if (!e) return null;

        const { documentId, title, category, image, content, publishDate } = e;

        const _image = getImageType(image);

        if (!_image || !publishDate) return null;

        return {
            id: documentId,
            title: title,
            href: '',
            category: null,
            image: _image,
            totalTime: 0,
            publishDate: publishDate,
            content: content || null,
        };
    }

    getMany(e: ReadonlyArray<Old | null | undefined> | null | undefined): New[] {
        const data: New[] = [];

        e?.forEach((k) => {
            const el = this.getOne(k);

            if (!el) return;

            data.push(el);
        });

        return data;
    }

    getConfig(): IMapperConfig {
        return this.config;
    }
}
