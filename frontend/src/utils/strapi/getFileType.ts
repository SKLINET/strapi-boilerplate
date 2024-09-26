import { IFile } from '../../types/file';
import { appFileFragment$data } from '../../relay/__generated__/appFileFragment.graphql';
import { getImageUrl } from '../getImageUrl';

type Fragment = Omit<appFileFragment$data, ' $fragmentType'>;

export const getFileType = (e: Fragment | null | undefined): IFile | null => {
    if (!e) return null;

    const { documentId, name, url, size } = e;

    const _size = Math.round((size / 1024) * 100) / 100;

    return {
        id: documentId,
        name: name,
        href: getImageUrl(url),
        size: `${_size} MB`,
    };
};

export const getFileListType = (e: ReadonlyArray<Fragment | null | undefined> | null | undefined): IFile[] => {
    const data: IFile[] = [];

    e?.forEach((k) => {
        const item = getFileType(k);

        if (!item) return;

        data.push(item);
    });

    return data;
};
