import { shouldRenderField } from '../../app/components/organisms/FormBuilder/FormBuilder';
import { IApp } from '../../types/base/app';
import { IFormField } from '../../types/form';
import { getSystemResource } from '../strapi/getSystemResource';
import * as yup from 'yup';

const applyConditions = (yupRecord: yup.Schema<any>, field: IFormField, allFields: IFormField[], app: IApp) => {
    const conditions = field.conditions || [];

    if (conditions.length === 0) return yupRecord;

    // TODO: Fallback error is used every time a field is required, but it should be more specific
    const fallbackError = getSystemResource('required_field', app?.systemResources);

    switch (field.type) {
        case 'textinput':
        case 'textarea':
        case 'email':
        case 'phone': {
            return yup.string().test('conditional', fallbackError, (value, { parent }) => {
                if (shouldRenderField(field, allFields, parent)) {
                    return yupRecord.isValidSync(value);
                }
                return true;
            });
        }
        case 'checkbox': {
            return yup.boolean().test('conditional', fallbackError, (value, { parent }) => {
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
                .test('conditional', fallbackError, (value, { parent }) => {
                    if (shouldRenderField(field, allFields, parent)) {
                        return yupRecord.isValidSync(value);
                    }
                    return true;
                });
        }
        case 'file': {
            return yup.array().test('conditional', fallbackError, (value, { parent }) => {
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
                                .min(9, getSystemResource('invalid_phone_number', app?.systemResources)),
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
                                    'min-if-filled',
                                    getSystemResource('invalid_phone_number', app?.systemResources),
                                    (value) => !value || value.length >= 9,
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
                    if (e.required) {
                        yupObject[e.name] = applyConditions(
                            yup.array().min(1, getSystemResource('required_field', app?.systemResources)),
                            e,
                            data,
                            app,
                        );
                    } else {
                        yupObject[e.name] = applyConditions(yup.array().notRequired(), e, data, app);
                    }
                }
                return;
            }
            default:
                return;
        }
    });

    return yupObject;
};
