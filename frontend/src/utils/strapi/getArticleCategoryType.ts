import { IArticleCategory } from '../../types/article';
import { articleCategoryFragment$data } from '../../relay/__generated__/articleCategoryFragment.graphql';

type Fragment = Omit<articleCategoryFragment$data, ' $fragmentType'>;

export const getArticleCategoryType = (e: Fragment | null | undefined): IArticleCategory | null => {
    if (!e) return null;

    const { documentId, title } = e;

    return {
        id: documentId,
        title: title,
    };
};

export const getArticleCategoryListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): IArticleCategory[] => {
    const data: IArticleCategory[] = [];

    e?.forEach((k) => {
        const el = getArticleCategoryType(k);

        if (!el) return;

        data.push(el);
    });

    return data;
};
