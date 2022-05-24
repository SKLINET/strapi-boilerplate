import { createContext } from 'react';
import { AppContextProps } from '../../types/appContext';

export const AppContext = createContext<AppContextProps>({
    uri: '',
    systemResources: [],
    locale: '',
    locales: [],
    pageId: 0,
    showSpinner: false,
    setShowSpinner: () => {
        // set spinner
    },
});
