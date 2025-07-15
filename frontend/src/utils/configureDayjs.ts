import config from '../../sklinet.config.json';
import { IApp } from '../types/base/app';

// Day JS
import { CALENDAR_FORMATS, MONTHS, MONTHS_CALENDAR } from '../constants';
import dayjs from 'dayjs';

// Day JS locales
import 'dayjs/locale/cs';
import 'dayjs/locale/en';

// Day JS plugins
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

export const configureDayjs = (app: IApp, type: 'base' | 'calendar' = 'base') => {
    const { tz } = config;

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    dayjs.extend(weekOfYear);
    dayjs.extend(isSameOrAfter);
    if (app.locale) {
        dayjs.updateLocale(app.locale, {
            calendar: CALENDAR_FORMATS[app.locale],
            months: type === 'calendar' ? MONTHS_CALENDAR[app.locale] : MONTHS[app.locale],
        });
        dayjs.locale(app.locale);
    }
    dayjs.tz.setDefault(tz);
};
