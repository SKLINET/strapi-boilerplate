'use client';

import ArticleMapper from './content/ArticleMapper';

import { IMapperConfig } from '../../types/base/mapper';

export default class Mapper {
    public article: ArticleMapper;

    public constructor(config: IMapperConfig) {
        this.article = new ArticleMapper(config);
    }
}
