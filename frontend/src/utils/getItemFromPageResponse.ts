import { IApp } from '../types/app';
import { IPageResponse } from '../types/page';

export const getItemFromPageResponse = ({ blocksPropsMap }: IPageResponse): IApp['item'] => {
    let item =
        Array.isArray(blocksPropsMap) && blocksPropsMap.length > 0
            ? blocksPropsMap[0].item || blocksPropsMap[0].data?.item
            : undefined;
    if (!item && blocksPropsMap && Object.keys(blocksPropsMap)?.length > 0) {
        const firstKey = Object.keys(blocksPropsMap)[0];
        item =
            ((blocksPropsMap as Record<string, any>)[firstKey].item as Record<string, any>) ||
            ((blocksPropsMap as Record<string, any>)[firstKey].data?.item as Record<string, any>) ||
            undefined;
    }

    return item;
};
