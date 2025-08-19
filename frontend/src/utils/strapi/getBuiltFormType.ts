import { IBuiltForm } from '../../types/form';
import { appBuiltFormFragment$data } from '../../relay/__generated__/appBuiltFormFragment.graphql';

type Fragment = Omit<appBuiltFormFragment$data, ' $fragmentType'>;

export const getBuiltFormType = (e: Fragment | null | undefined): IBuiltForm | null => {
    if (!e) return null;

    const { documentId, title, data, successMessage, errorMessage } = e;

    const _data = typeof data === 'string' ? JSON.parse(data) : data;

    return {
        id: documentId,
        title: title,
        data: Array.isArray(_data) ? _data : [],
        successMessage: successMessage,
        errorMessage: errorMessage,
    };
};

export const getBuiltFormListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): IBuiltForm[] => {
    const data: IBuiltForm[] = [];

    e?.forEach((k) => {
        const el = getBuiltFormType(k);

        if (!el) return;

        data.push(el);
    });

    return data;
};
