'use client';

import React, { ReactElement, useTransition, useEffect, useState } from 'react';
import styles from './FormBuilder.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { IBuiltForm, ICondition, IFormField, ISelectedOption, ISendEmail } from '../../../../types/form';
import { useForm, SubmitHandler, Resolver, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getValidationObject } from '../../../../utils/form/getValidationObject';
import { getDefaultValues } from '../../../../utils/form/getDefaultValues';
import { TextInput } from '../../primitives/TextInput/TextInput';
import { Checkbox } from '../../primitives/Checkbox/Checkbox';
import { Button } from '../../primitives/Button/Button';
import { useAsPath } from '../../../../utils/hooks/useAsPath';
import axios from 'axios';
import { Text } from '../../primitives/Text/Text';
import { TextArea } from '../../primitives/TextArea/TextArea';
import { ISelectItem, SelectInput } from '../../primitives/SelectInput/SelectInput';
import { FileInput } from '../../primitives/FileInput/FileInput';
import { IFile, IFileInput } from '../../../../types/file';

interface FormBuilderProps {
    data: IBuiltForm;
    additionalData?: Record<string, any>;
    sendEmail?: ISendEmail | null;
    app: IApp;
    className?: string;
    allowSmallWidth?: boolean;
}

export const shouldRenderField = (
    field: IFormField,
    allFields: IFormField[],
    formValues: Record<string, any>,
): boolean => {
    if (!field.conditions || field.conditions.length === 0) return true;

    const handleCondition = (condition: ICondition) => {
        const conditionField = allFields.find((e) => e.id === condition.fieldId);

        // If the condition field has conditions, we need to check if the conditions are met
        if (conditionField && conditionField.conditions && conditionField.conditions.length > 0) {
            const shouldRenderInner = shouldRenderField(conditionField, allFields, formValues);

            if (!shouldRenderInner) return false;
        }

        switch (conditionField?.type) {
            case 'textinput':
            case 'email':
            case 'phone': {
                const conditionValue = condition.value as string;
                const conditionFieldValue: string = formValues[conditionField.name || ''];

                switch (condition.operator) {
                    case 'equals':
                        return conditionFieldValue === conditionValue;
                    case 'not-equals':
                        return conditionFieldValue !== conditionValue;
                    case 'contains':
                        return conditionFieldValue.includes(conditionValue);
                    case 'not-contains':
                        return !conditionFieldValue.includes(conditionValue);
                    case 'empty':
                        return conditionFieldValue.trim() === '';
                    case 'not-empty':
                        return conditionFieldValue.trim() !== '';
                }

                return false;
            }
            case 'checkbox': {
                const conditionValue = condition.value as boolean;
                const conditionFieldValue: boolean = formValues[conditionField.name || ''];

                switch (condition.operator) {
                    case 'equals':
                        return conditionFieldValue === conditionValue;
                }
                return false;
            }
            /*
            case 'checkboxGroup': {
                const conditionValue = condition.value as ISelectedOption;
                const conditionFieldValue: ISelectedOption[] = formValues[conditionField.name || ''];

                switch (condition.operator) {
                    case 'has-checked':
                        return conditionFieldValue.some((e) => e.key === conditionValue.key);
                }

                return false;
            }
            */
            case 'select': {
                const conditionValue = condition.value as ISelectedOption;
                const conditionFieldValue: ISelectItem<ISelectedOption> | null = formValues[conditionField.name || ''];

                switch (condition.operator) {
                    case 'equals':
                        return conditionFieldValue?.data.key === conditionValue.key;
                    case 'not-equals':
                        return conditionFieldValue?.data.key !== conditionValue.key;
                    case 'empty':
                        return !conditionFieldValue?.data.key;
                    case 'not-empty':
                        return !!conditionFieldValue?.data.key;
                }

                return false;
            }
            default:
                return false;
        }
    };

    // OR eval
    if (field.conditionsEval === 'or') {
        return field.conditions.some(handleCondition);
    }

    // AND eval
    return field.conditions.every(handleCondition);
};

/*
const getTotalPrice = (fields: string[], allFields: IFormField[], formValues: Record<string, any>) => {
    let price = 0;

    for (const [key, value] of Object.entries(formValues)) {
        const _value = value as IProductRecord[];

        const _field = allFields.find((e) => e.type === 'productsSelection' && e.name === key);

        if (_field && shouldRenderField(_field, allFields, formValues)) {
            if (fields.length > 0 ? fields.includes(key) : true && Array.isArray(_value)) {
                _value.forEach((e) => {
                    if (typeof e?.totalPrice === 'number') {
                        price += e.totalPrice;
                    }
                });
            }
        }
    }

    return price;
};
*/

const FormBuilder = ({
    data: { data, successMessage, errorMessage },
    additionalData = {},
    sendEmail,
    app,
    className,
    allowSmallWidth = false,
}: FormBuilderProps): ReactElement => {
    const asPath = useAsPath();

    const [state, setState] = useState<'success' | 'error' | null>(null);

    const [isPending, startTransition] = useTransition();

    // Validation schema
    const schema = yup.object(getValidationObject(data, app)).required();

    // Init useForm
    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        setError,
        trigger,
        formState: { errors, isSubmitted },
    } = useForm<any>({
        defaultValues: getDefaultValues(data),
        resolver: yupResolver(schema) as Resolver<any>,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const allValues = useWatch({ control });

    useEffect(() => {
        if (isSubmitted) {
            trigger();
        }
    }, [isSubmitted, JSON.stringify(allValues)]);

    const onSubmit: SubmitHandler<any> = async (_data) => {
        if (!isPending) {
            startTransition(async () => {
                /*
                const ammountFields = data.filter((e) => e.type === 'amount');

                ammountFields.forEach((e) => {
                    if (!e.name) return;

                    _data[e.name] = `${getFormattedPrice(getTotalPrice(e.fields, data, _data))} Kč`;
                });
                */

                const files: IFileInput[] = [];
                const rest: Record<string, any> = {};
                const labels: Record<string, any> = {};

                let i = -1;
                for (const [key, value] of Object.entries(_data)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    i = data.findIndex((e) => e?.name === key);

                    const field = data.find((e: any) => e?.name === key);

                    const useOnly = (field as any)?.useOnly || false;

                    if (field && (!shouldRenderField(field, data, allValues) || useOnly)) continue;

                    if ((field as any)?.label) {
                        labels[key] = (field as any).label;
                    } else {
                        for (let k = i; k >= 0; k--) {
                            const el = data[k];

                            if (!el || !shouldRenderField(el, data, allValues)) continue;

                            // Fallback label when field does not have label
                            if (el.type === 'title') {
                                labels[key] = el.label;
                                break;
                            }
                        }
                    }

                    if (Array.isArray(value) && value.length > 0 && value[0]?.typename === 'file') {
                        files.push(...value);
                    } else {
                        if (Array.isArray(value) && value.length === 0) continue;

                        if (value && typeof value === 'object') {
                            const _value = value as any;

                            if (_value.typename === 'select') {
                                rest[key] = (_value as ISelectItem<any>).title;
                                continue;
                            }
                        }

                        rest[key] = value;
                    }
                }

                const formData = new FormData();
                files.forEach((e) => {
                    formData.append('files', e.data as File, e.title);
                });

                formData.append(
                    'formInfo',
                    JSON.stringify({
                        sendEmail: sendEmail || null,
                        asPath: asPath,
                        withFiles: files.length > 0,
                    }),
                );
                formData.append('formData', JSON.stringify({ ...additionalData, ...rest }));
                formData.append('formLabels', JSON.stringify(labels));

                const res = await axios.post('/api/submit-form', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                });

                if (res?.data?.success) {
                    setState('success');
                } else {
                    setState('error');
                }
            });
        }
    };

    const renderField = (field: IFormField) => {
        if (!shouldRenderField(field, data, allValues)) return null;

        switch (field.type) {
            case 'textinput':
            case 'email':
            case 'phone': {
                const { id, name, label, placeholder, required, onFullWidth } = field;
                if (!name) return null;
                return (
                    <TextInput
                        key={id}
                        name={name}
                        type={field.type === 'email' ? 'email' : 'text'}
                        register={register}
                        label={label || undefined}
                        error={errors[name]?.message?.toString()}
                        placeholder={placeholder || undefined}
                        disabled={isPending || state === 'success'}
                        required={required || false}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            case 'textarea': {
                const { id, name, label, placeholder, required, onFullWidth } = field;
                if (!name) return null;
                return (
                    <TextArea
                        key={id}
                        name={name}
                        register={register}
                        label={label || undefined}
                        error={errors[name]?.message?.toString()}
                        placeholder={placeholder || undefined}
                        disabled={isPending}
                        required={required || false}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            case 'checkbox': {
                const { id, name, label, required, onFullWidth } = field;
                if (!name) return null;
                return (
                    <Checkbox
                        key={id}
                        name={name}
                        register={register}
                        label={label || undefined}
                        checked={watch(name)}
                        error={errors[name]?.message?.toString()}
                        disabled={isPending || state === 'success'}
                        required={required || false}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            case 'file': {
                const {
                    id,
                    name,
                    label,
                    required,
                    placeholder,
                    allowedFileTypes,
                    maxFileCount,
                    maxFileSize,
                    onFullWidth,
                } = field;
                if (!name) return null;
                return (
                    <FileInput
                        key={id}
                        value={watch(name)}
                        onChange={(e) => {
                            setValue(name, e);
                            if (errors[name]?.message?.toString()) {
                                setError(name, {
                                    type: 'custom',
                                    message: '',
                                });
                            }
                        }}
                        onMaxSizeExceeded={(e) =>
                            setError(
                                name,
                                {
                                    type: 'custom',
                                    message: e,
                                },
                                { shouldFocus: true },
                            )
                        }
                        error={errors[name]?.message?.toString()}
                        placeholder={placeholder}
                        label={label}
                        required={required}
                        disabled={isPending}
                        maxSize={maxFileSize}
                        maxCount={maxFileCount}
                        allowedFileTypes={allowedFileTypes}
                        app={app}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            case 'select': {
                const { id, name, label, required, placeholder, options, onFullWidth } = field;
                if (!name) return null;
                return (
                    <SelectInput<ISelectedOption>
                        key={id}
                        name={name}
                        selectedItem={watch(name) as any}
                        onChange={(value) => setValue(name, value, { shouldValidate: isSubmitted })}
                        options={
                            options.map((e) => ({
                                typename: 'select',
                                id: e.key,
                                title: e.label,
                                data: e,
                            })) as ISelectItem<ISelectedOption>[]
                        }
                        label={label || undefined}
                        error={errors[name]?.message?.toString()}
                        placeholder={placeholder || undefined}
                        disabled={isPending}
                        required={required || false}
                        app={app}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            /*
            case 'checkboxGroup': {
                const { id, name, label, options, onFullWidth } = field;
                if (!name) return null;
                return (
                    <CheckboxGroup
                        key={id}
                        value={watch(name) as any}
                        onChange={(value) => setValue(name, value, { shouldValidate: isSubmitted })}
                        options={options}
                        label={label || undefined}
                        disabled={isPending}
                        onFullWidth={onFullWidth && allowSmallWidth}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            case 'productsSelection': {
                const { id, name, label, products, onFullWidth } = field;
                if (!name) return null;
                return (
                    <ProductsInput
                        key={id}
                        value={watch(name) as any}
                        onChange={(value) => setValue(name, value, { shouldValidate: isSubmitted })}
                        products={products}
                        label={label || undefined}
                        disabled={isPending}
                        onFullWidth={onFullWidth && allowSmallWidth}
                        className={clsx(styles.field, styles.productsSelection, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            case 'amount': {
                const { id, name, label, fields, onFullWidth } = field;
                if (!name) return null;
                return (
                    <Amount
                        key={id}
                        label={label || ''}
                        price={getTotalPrice(fields, data, allValues)}
                        className={clsx(styles.field, !onFullWidth && styles.smallWidth)}
                    />
                );
            }
            */
            case 'submit': {
                if (state === 'success') return null;

                const { id, label, onFullWidth } = field;
                return (
                    <Button
                        key={id}
                        submit
                        disabled={Object.keys(errors).length > 0}
                        loading={isPending}
                        className={clsx(styles.submit, !onFullWidth && styles.smallWidth)}
                    >
                        {label}
                    </Button>
                );
            }
            /*
            case 'title': {
                const { id, label, isLarge, onFullWidth } = field;
                return (
                    <Text
                        key={id}
                        color="gray-90"
                        weight="semibold"
                        className={clsx(
                            styles.field,
                            styles.title,
                            isLarge && styles.large,
                            !onFullWidth && styles.smallWidth,
                        )}
                    >
                        {label}
                    </Text>
                );
            }
            case 'message': {
                const { id, label, onFullWidth } = field;
                return (
                    <Text
                        key={id}
                        size="sm"
                        color="gray-80"
                        className={clsx(styles.field, styles.message, !onFullWidth && styles.smallWidth)}
                    >
                        {label}
                    </Text>
                );
            }
            case 'divider': {
                const { id, onFullWidth } = field;
                return (
                    <hr key={id} className={clsx(styles.field, !onFullWidth && styles.smallWidth, styles.divider)} />
                );
            }
            case 'special': {
                switch (field.codename) {
                    default:
                        return null;
                }
            }
            */
            default:
                return null;
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className={clsx(styles.wrapper, allowSmallWidth && styles.allowSmallWidth, className)}
        >
            {state === 'success' ? (
                <>{successMessage && <Text>{successMessage}</Text>}</>
            ) : (
                <>
                    {state === 'error' && errorMessage && <Text>{errorMessage}</Text>}
                    {data.map((e) => renderField(e))}
                </>
            )}
        </form>
    );
};

export { FormBuilder };
