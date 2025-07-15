import { IFormField } from '../../types/form';

export const getDefaultValues = (data: IFormField[]) => {
    const object: Record<string, any> = {};
    data.forEach((e) => {
        switch (e.type) {
            case 'textinput':
            case 'textarea':
            case 'email':
            case 'phone': {
                if (e.name) {
                    object[e.name] = '';
                }
                return;
            }
            case 'checkbox': {
                if (e.name) {
                    object[e.name] = false;
                }
                return;
            }
            case 'select': {
                if (e.name) {
                    object[e.name] = null;
                }
                return;
            }
            case 'file':
            case 'checkboxGroup':
            case 'productsSelection': {
                if (e.name) {
                    object[e.name] = [];
                }
                return;
            }
            case 'amount': {
                if (e.name) {
                    object[e.name] = 0;
                }
                return;
            }
            default:
                return;
        }
    });

    return object;
};
