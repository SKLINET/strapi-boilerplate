import { shouldRenderField } from '../../app/components/organisms/FormBuilder/FormBuilder';
import { IApp } from '../../types/base/app';
import { IFormField } from '../../types/form';
import { getSystemResource } from '../strapi/getSystemResource';
import * as yup from 'yup';

const applyConditions = (
    yupRecord: yup.Schema<any>,
    field: IFormField,
    allFields: IFormField[],
    app: IApp,
    error: string = getSystemResource('required_field', app.systemResources),
) => {
    const conditions = field.conditions || [];

    if (conditions.length === 0) return yupRecord;

    switch (field.type) {
        case 'textinput':
        case 'textarea':
        case 'email':
        case 'phone': {
            return yup.string().test('conditional', error, (value, { parent }) => {
                if (shouldRenderField(field, allFields, parent)) {
                    return yupRecord.isValidSync(value);
                }
                return true;
            });
        }
        case 'checkbox': {
            return yup.boolean().test('conditional', error, (value, { parent }) => {
                if (shouldRenderField(field, allFields, parent)) {
                    return yupRecord.isValidSync(value);
                }
                return true;
            });
        }
        case 'select': {
            return yup
                .mixed()
                .notRequired()
                .test('conditional', error, (value, { parent }) => {
                    if (shouldRenderField(field, allFields, parent)) {
                        return yupRecord.isValidSync(value);
                    }
                    return true;
                });
        }
        case 'file': {
            return yup.array().test('conditional', error, (value, { parent }) => {
                if (shouldRenderField(field, allFields, parent)) {
                    return yupRecord.isValidSync(value);
                }
                return true;
            });
        }
        case 'productsSelection': {
            return yup.array().test('conditional', error, (value, { parent }) => {
                if (shouldRenderField(field, allFields, parent)) {
                    return yupRecord.isValidSync(value);
                }
                return true;
            });
        }
    }

    return yupRecord;
};

export const getValidationObject = (data: IFormField[], app: IApp) => {
    const yupObject: Record<string, any> = {};
    data.forEach((e) => {
        switch (e.type) {
            case 'textinput':
            case 'textarea': {
                if (e.name && e.required) {
                    yupObject[e.name] = applyConditions(
                        yup.string().required(getSystemResource('required_field', app?.systemResources)),
                        e,
                        data,
                        app,
                    );
                }
                return;
            }
            case 'email': {
                if (e.name) {
                    if (e.required) {
                        yupObject[e.name] = applyConditions(
                            yup
                                .string()
                                .required(getSystemResource('required_field', app?.systemResources))
                                .email(getSystemResource('invalid_email', app?.systemResources)),
                            e,
                            data,
                            app,
                        );
                    } else {
                        yupObject[e.name] = applyConditions(
                            yup.string().email(getSystemResource('invalid_email', app?.systemResources)),
                            e,
                            data,
                            app,
                        );
                    }
                }
                return;
            }
            case 'phone': {
                if (e.name) {
                    if (e.required) {
                        yupObject[e.name] = applyConditions(
                            yup
                                .string()
                                .required(getSystemResource('required_field', app?.systemResources))
                                .test(
                                    'valid-phone',
                                    getSystemResource('invalid_phone_number', app?.systemResources),
                                    (value) => {
                                        if (!value) return false;
                                        // Odstranění mezer
                                        const sanitized = value.replace(/\s/g, '');
                                        // Pokud obsahuje písmena, je to neplatné
                                        if (/[a-zA-Z]/.test(sanitized)) return false;
                                        // Povolen pouze + a číslice
                                        if (!/^\+?\d{9,12}$/.test(sanitized)) return false;
                                        // Počet číslic bez + musí být 9 až 12
                                        const digits = sanitized.replace(/\D/g, '');
                                        return digits.length >= 9 && digits.length <= 12;
                                    },
                                ),
                            e,
                            data,
                            app,
                        );
                    } else {
                        yupObject[e.name] = applyConditions(
                            yup
                                .string()
                                .notRequired()
                                .test(
                                    'valid-phone',
                                    getSystemResource('invalid_phone_number', app?.systemResources),
                                    (value) => {
                                        if (!value) return true; // Pokud není vyplněno, je to ok
                                        // Odstranění mezer
                                        const sanitized = value.replace(/\s/g, '');
                                        // Pokud obsahuje písmena, je to neplatné
                                        if (/[a-zA-Z]/.test(sanitized)) return false;
                                        // Povolen pouze + a číslice
                                        if (!/^\+?\d{9,12}$/.test(sanitized)) return false;
                                        // Počet číslic bez + musí být 9 až 12
                                        const digits = sanitized.replace(/\D/g, '');
                                        return digits.length >= 9 && digits.length <= 12;
                                    },
                                ),
                            e,
                            data,
                            app,
                        );
                    }
                }
                return;
            }
            case 'checkbox': {
                if (e.name) {
                    if (e.required) {
                        yupObject[e.name] = applyConditions(
                            yup.boolean().isTrue(getSystemResource('required_field', app?.systemResources)),
                            e,
                            data,
                            app,
                        );
                    } else {
                        yupObject[e.name] = applyConditions(yup.boolean(), e, data, app);
                    }
                }
                return;
            }
            case 'select': {
                if (e.name) {
                    if (e.required) {
                        yupObject[e.name] = applyConditions(
                            yup
                                .mixed()
                                .required(getSystemResource('required_field', app?.systemResources))
                                .test(
                                    'not-null',
                                    getSystemResource('required_field', app?.systemResources),
                                    (value) => !!value,
                                ),
                            e,
                            data,
                            app,
                        );
                    } else {
                        yupObject[e.name] = applyConditions(
                            yup
                                .mixed()
                                .notRequired()
                                .test(
                                    'not-null',
                                    getSystemResource('required_field', app?.systemResources),
                                    (value) => !!value,
                                ),
                            e,
                            data,
                            app,
                        );
                    }
                }
                return;
            }
            case 'file': {
                if (e.name) {
                    let fileValidation = yup.array();

                    if (e.required) {
                        fileValidation = fileValidation.min(
                            1,
                            getSystemResource('required_field', app?.systemResources),
                        );
                    }

                    // Add file type validation
                    if (e.allowedFileTypes && e.allowedFileTypes.length > 0) {
                        fileValidation = fileValidation.test(
                            'file-type',
                            getSystemResource('file_type_error', app?.systemResources),
                            (files: any[] | undefined) => {
                                if (!files || files.length === 0) return true;

                                return files.every((fileInput) => {
                                    if (!fileInput?.data) return true;

                                    const file: File = fileInput.data;
                                    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
                                    const mimeType = file.type.toLowerCase();

                                    return e.allowedFileTypes!.some((allowedType) => {
                                        const normalizedType = allowedType.toLowerCase();
                                        return (
                                            normalizedType === fileExtension ||
                                            normalizedType === mimeType ||
                                            (normalizedType.includes('/') &&
                                                mimeType.startsWith(normalizedType.split('/')[0]))
                                        );
                                    });
                                });
                            },
                        );
                    }

                    yupObject[e.name] = applyConditions(fileValidation, e, data, app);
                }
                return;
            }
            case 'productsSelection': {
                if (e.name) {
                    yupObject[e.name] = applyConditions(
                        yup.array().min(1, getSystemResource('empty_products_selection', app?.systemResources)),
                        e,
                        data,
                        app,
                        getSystemResource('empty_products_selection', app?.systemResources),
                    );
                }
                return;
            }
            default:
                return;
        }
    });

    return yupObject;
};
