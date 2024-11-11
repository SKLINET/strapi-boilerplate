import { IArticle } from '../../types/article';
import { articleFragment$data } from '../../relay/__generated__/articleFragment.graphql';
import { IApp } from '../../types/base/app';
import { getImageType } from './getImageType';
import { getItemUrl } from '../getItemUrl';
import { getArticleCategoryType } from './getArticleCategoryType';
import { getReadingTime } from '../getReadingTime';

type Fragment = Omit<articleFragment$data, ' $fragmentType'>;

export const getArticleType = (e: Fragment | null | undefined, app: IApp): IArticle | null => {
    if (!e) return null;

    const { documentId, title, category, image, content, publishDate } = e;

    const _category = getArticleCategoryType(category);
    const _image = getImageType(image);

    const _totalTime = getReadingTime(content || '');

    const _href = getItemUrl(app?.webSetting?.articleDetailPage?.url, e, app);

    if (!_image || !_href || !publishDate) return null;

    return {
        id: documentId,
        title: title,
        href: _href,
        category: _category,
        image: _image,
        totalTime: _totalTime,
        publishDate: publishDate,
        content: content || null,
    };
};

export const getArticleListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
    app: IApp,
): IArticle[] => {
    const data: IArticle[] = [];

    e?.forEach((k) => {
        const el = getArticleType(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
