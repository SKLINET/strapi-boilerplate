import { IApp } from '../../types/base/app';

export const pageInfoLog = (app: IApp) => {
    const getLocale = () => {
        switch (app.locale) {
            case 'cs':
                return 'Czech';
            case 'en':
                return 'English';
            default:
                return 'Unknown';
        }
    };

    console.log('');
    console.log('- - - - - - - - - - - - - - - -');
    console.log('💡', app?.page?.title || '', `(${getLocale()})`);
    console.log('- - - - - - - - - - - - - - - -');
};
