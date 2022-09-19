import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from '../../primitives/TextInput/TextInput';
import { Button } from '../../primitives/Button/Button';
import axios from 'axios';

interface TemplatedEmailFormProps {
    templateId: number;
}

interface FormData {
    [key: string]: string;
}

const schema = yup
    .object({
        email: yup.string().email('E-mail není validní!').required('Toto pole je povinné!'),
        name: yup.string().required('Toto pole je povinné!'),
    })
    .required();

const TemplatedEmailForm = ({ templateId }: TemplatedEmailFormProps): ReactElement => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            name: '',
        },
        resolver: yupResolver(schema),
    });
    const onSubmit = async (values: FormData) => {
        const formData = new FormData();
        formData.append('email', values?.email || '');
        formData.append('firstName', values?.name || '');
        formData.append('templateId', String(templateId));

        const { data } = await axios.post('/api/sendTemplatedEmail', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
        });

        if (data.success) {
            console.log('SENT');
        } else {
            console.log('NOT SENT');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full max-w-120 p-8">
            <TextInput
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder="E-mail"
                type="email"
            />
            <TextInput
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="Jméno"
                className="mt-4"
            />
            <Button type="submit" className="mt-6">
                Odeslat
            </Button>
        </form>
    );
};

export { TemplatedEmailForm };
