import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@storybook/addon-console';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import 'tailwindcss/tailwind.css';
import '../src/styles/global.scss';
import '!style-loader!css-loader!./custom.css';
// @ts-ignore
import theme from './theme';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';
import { CALENDAR_FORMATS } from '../src/constants';
import AppStore from '@symbio/headless/dist/lib/store/AppStore';
import { PageProps } from '../src/types/page';
import { WebSettingsProps } from '../src/types/webSettings';

dayjs.extend(updateLocale);
dayjs.extend(timeZone);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.updateLocale('en', { calendar: CALENDAR_FORMATS['en'] });
dayjs.locale('en');

AppStore.getInstance<PageProps, WebSettingsProps>({
    currentUrl: '/',
    page: {
        id: '14320773',
        url: 'homepage',
        _allUrlLocales: [
            { locale: 'en', value: 'homepage' },
            { locale: 'pl', value: 'homepage' },
        ],
        title: 'Homepage',
        _status: 'published',
        _seoMetaTags: [],
        metaTags: null,
        parent: null,
        content: [],
    },
    site: {
        globalSeo: {
            siteName: 'Boilerplate',
            titleSuffix: ' - Boilerplate',
            facebookPageUrl: 'https://www.facebook.com/SkupinaPPF/',
            fallbackSeo: {
                description:
                    'Za úspěchem, profesionalitou a cílevědomostí skupiny PPF je téměř třicetiletá práce Petra Kellnera a týmu jeho spolupracovníků.',
                title: 'PPF Group',
                image: { url: 'https://www.datocms-assets.com/40359/1609949272-ppf-gate-web.jpg' },
                twitterCard: 'summary_large_image',
            },
            twitterAccount: '@SkupinaPPF',
        },
        favicon: null,
        faviconMetaTags: [],
    },
    webSetting: {
        logo: null,
        mainMenu: {
            links: [],
        },
        homepage: { title: 'Homepage', url: 'homepage' },
        footerMenu: { links: [] },
    },
    redirect: null,
});

export const parameters = {
    nextRouter: {
        Provider: RouterContext.Provider,
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        initialViewport: 'iphone6',
    },
    options: {
        storySort: {
            order: ['Blocks', 'Organisms', 'Molecules', 'Primitives'],
        },
    },
    backgrounds: {
        default: 'white',
        values: [
            {
                name: 'white',
                value: '#ffffff',
            },
            {
                name: 'beige',
                value: '#F7F3EB',
            },
            {
                name: 'blue',
                value: '#004584',
            },
            {
                name: 'lightBlue',
                value: '#00B5EC',
            },
            {
                name: 'grey',
                value: '#8FA0A5',
            },
            {
                name: 'greyLight',
                value: '#D1D3DD',
            },
        ],
    },
    docs: {
        theme,
    },
};
