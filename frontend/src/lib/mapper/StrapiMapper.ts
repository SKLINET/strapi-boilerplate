'use client';

import { IMapperConfig } from '../../types/base/mapper';

export default abstract class StrapiMapper<Old, New> {
    protected config: IMapperConfig;

    public constructor(config: IMapperConfig) {
        this.config = config;
    }

    getOne(e: Old | null | undefined): New | null {
        return null;
    }

    getMany(e: ReadonlyArray<Old | null | undefined> | null | undefined): New[] {
        return [];
    }

    getConfig(): IMapperConfig {
        return this.config;
    }
}
