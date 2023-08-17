import { IArticle } from '../../types/article';
import { articleFragment$data } from '../../relay/__generated__/articleFragment.graphql';
import { IApp } from '../../types/app';
import { getImageType } from './getImageType';
import { getItemUrl } from '../getItemUrl';

type StrapiArticleFragment = Omit<articleFragment$data, ' $fragmentType'>;

export const getArticleType = (e: StrapiArticleFragment | null | undefined, app: IApp): IArticle | null => {
    if (!e || !e.attributes) return null;

    const {
        id,
        attributes: { title, perex, image },
    } = e;

    const _image = getImageType(image);

    const _href = app?.webSetting?.data?.attributes?.articleDetailPage
        ? getItemUrl(app?.webSetting?.data?.attributes?.articleDetailPage?.data?.attributes?.url || '', e)
        : null;

    if (!_image || !_href) return null;

    return {
        id: id || '',
        title: title,
        perex: perex,
        href: _href,
        image: _image,
    };
};

export const getArticleListType = (
    e: ReadonlyArray<StrapiArticleFragment | null> | null | undefined,
    app: IApp,
): IArticle[] => {
    const data: IArticle[] = [];

    e?.forEach((k) => {
        const _house = getArticleType(k, app);

        if (!_house) return;

        data.push(_house);
    });

    return data;
};
