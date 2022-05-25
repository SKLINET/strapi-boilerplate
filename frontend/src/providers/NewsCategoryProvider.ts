import { DatoCMSProvider as AbstractDatoCMSProvider } from '@symbio/cms-datocms';
import * as d from '../relay/__generated__/newsCategoryDetailQuery.graphql';
import * as l from '../relay/__generated__/newsCategoryListQuery.graphql';
import { newsCategoryDetailQuery, newsCategoryListQuery } from '../relay/newsCategory';
import symbio from '../../symbio.config.json';
import models from '../models.json';

class NewsCategoryProvider extends AbstractDatoCMSProvider<d.newsCategoryDetailQuery, l.newsCategoryListQuery> {}

export default new NewsCategoryProvider(newsCategoryDetailQuery, newsCategoryListQuery, {
    id: models['news_category'],
    apiKey: 'news_category',
    locales: symbio.i18n.locales,
});
