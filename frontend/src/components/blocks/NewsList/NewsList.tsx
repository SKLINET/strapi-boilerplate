import React, { ReactElement, useContext } from 'react';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import { Heading } from '../../primitives/Heading/Heading';
import { Link } from '../../primitives/Link/Link';
import { AppContext } from '../../../utils/AppContext';
import { getPageUrl } from '../../../utils/getPageUrl';

interface NewsListProps {
    headline?: string | null;
    items: {
        data: {
            attributes: {
                title: string;
                perex: string;
                dateAdded: string;
                slug: string;
            };
        }[];
    };
    allNewsLinkText?: string;
}

const NewsList = ({ headline, allNewsLinkText, items }: NewsListProps): ReactElement<NewsListProps, 'div'> | null => {
    dayjs.extend(Calendar);
    const context = useContext(AppContext);
    const allNewsPage = context?.data?.attributes?.articlesPage?.data?.attributes?.url || '';
    const detailPage = context?.data?.attributes?.articleDetailPage?.data?.attributes?.url || '';

    return (
        <div className="flex flex-col items-center">
            {headline && (
                <Heading tag={'h2'} className="mt-0 tablet:mt-8">
                    {headline}
                </Heading>
            )}

            <ul className="flex p-0 flex-wrap gap-x-4">
                {items?.data?.map((item, i) => {
                    return (
                        <Link
                            key={`article-item-${i}`}
                            href={getPageUrl(detailPage).replace(':slug', item?.attributes?.slug)}
                        >
                            {item?.attributes.title}
                        </Link>
                    );
                })}
            </ul>
            {allNewsLinkText && <Link href={getPageUrl(allNewsPage)}>{allNewsLinkText || ''}</Link>}
        </div>
    );
};

NewsList.whyDidYouRender = true;

export { NewsList };
