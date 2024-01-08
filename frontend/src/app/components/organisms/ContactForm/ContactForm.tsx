'use client';

import React, { ReactElement, useState, useEffect, useTransition } from 'react';
import styles from './ContactForm.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/app';
import { Paragraph } from '../../primitives/Paragraph/Paragraph';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from '../../primitives/TextInput/TextInput';
import { Textarea } from '../../primitives/Textarea/Textarea';
import { Button } from '../../primitives/Button/Button';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';
import { Skeleton } from './Skeleton/Skeleton';
import { contactAction } from '../../../actions/contact';
import { Icon } from '../../primitives/Icon/Icon';

interface ContactFormProps {
    app: IApp;
    className?: string;
}

export interface ContactFormData {
    name: string;
    company: string;
    email: string;
    phoneNumber: string;
    message: string;
}

const ContactForm = ({ app, className }: ContactFormProps): ReactElement => {
    const [hydrated, setHydrated] = useState(false);

    const [isPending, startTransition] = useTransition();
    const [state, setState] = useState<'success' | 'error' | null>(null);

    useEffect(() => setHydrated(true), []);

    // Validation schema
    const schema = yup
        .object({
            name: yup.string().required(getSystemResource('required_field', app?.systemResources)),
            company: yup.string().required(getSystemResource('required_field', app?.systemResources)),
            email: yup
                .string()
                .required(getSystemResource('required_field', app?.systemResources))
                .email(getSystemResource('invalid_email', app?.systemResources)),
            phoneNumber: yup
                .string()
                .required(getSystemResource('required_field', app?.systemResources))
                .min(9, getSystemResource('invalid_phone_number', app?.systemResources)),
            message: yup.string().required(getSystemResource('required_field', app?.systemResources)),
        })
        .required();

    // Init useForm
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        defaultValues: {
            name: '',
            company: '',
            email: '',
            phoneNumber: '',
            message: '',
        },
        resolver: yupResolver(schema) as Resolver<ContactFormData>,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
        if (!isPending) {
            startTransition(async () => {
                const success = await contactAction(data, app);

                setState(success ? 'success' : 'error');
            });
        }
    };

    const successMessage = app?.contactForm?.data?.attributes?.successMessage || '';
    const errorMessage = app?.contactForm?.data?.attributes?.errorMessage || '';

    return (
        <div className={clsx(styles.wrapper, className)}>
            {hydrated ? (
                <>
                    {state === 'success' ? (
                        <div className={styles.success}>
                            <Paragraph className={styles.description}>{successMessage}</Paragraph>
                            <Button
                                onClick={() => {
                                    setState(null);
                                    reset();
                                }}
                                className={styles.button}
                            >
                                {getSystemResource('back_to_the_form', app.systemResources)}
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off">
                            {state === 'error' && (
                                <div className={styles.errorMessage}>
                                    <Icon name="alert" className={styles.icon} />
                                    <Paragraph className={styles.label}>{errorMessage}</Paragraph>
                                </div>
                            )}
                            <div className={styles.fields}>
                                <TextInput
                                    name="name"
                                    type="text"
                                    register={register}
                                    error={errors.name?.message}
                                    placeholder={getSystemResource('name', app?.systemResources)}
                                    disabled={isPending}
                                />
                                <TextInput
                                    name="company"
                                    type="text"
                                    register={register}
                                    error={errors.company?.message}
                                    placeholder={getSystemResource('company', app?.systemResources)}
                                    disabled={isPending}
                                />
                                <TextInput
                                    name="email"
                                    type="email"
                                    register={register}
                                    error={errors.email?.message}
                                    placeholder={getSystemResource('email', app?.systemResources)}
                                    disabled={isPending}
                                />
                                <TextInput
                                    name="phoneNumber"
                                    type="text"
                                    register={register}
                                    error={errors.phoneNumber?.message}
                                    placeholder={getSystemResource('phone_number', app?.systemResources)}
                                    disabled={isPending}
                                />
                                <Textarea
                                    name="message"
                                    register={register}
                                    error={errors.message?.message}
                                    placeholder={getSystemResource('message', app?.systemResources)}
                                    disabled={isPending}
                                />
                            </div>
                            <Button submit loading={isPending} className={styles.button}>
                                {getSystemResource('submit', app?.systemResources)}
                            </Button>
                        </form>
                    )}
                </>
            ) : (
                <Skeleton className={styles.skeleton} />
            )}
        </div>
    );
};

export { ContactForm };
