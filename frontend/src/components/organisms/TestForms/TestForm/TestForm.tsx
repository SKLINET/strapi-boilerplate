import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from '../../../primitives/TextInput/TextInput';
import { PasswordInput } from '../../../primitives/PasswordInput/PasswordInput';
import { TextArea } from '../../../primitives/TextArea/TextArea';
import { Checkbox } from '../../../primitives/Checkbox/Checkbox';
import { Switch } from '../../../primitives/Switch/Switch';
import { RadioButtons } from '../../../primitives/RadioButtons/RadioButtons';
import { Button } from '../../../primitives/Button/Button';
import { FileInput, IFile, IFiles } from '../../../primitives/FileInput/FileInput';

interface FormData {
    email: string;
    password: string;
    name: string;
    age: string;
    message: string;
    gdpr: boolean;
    nwsl: boolean;
    file: IFile;
    files: IFiles;
    gender: string;
}

const schema = yup
    .object({
        email: yup.string().email('E-mail není validní!').required('Toto pole je povinné!'),
        password: yup.string().required('Toto pole je povinné!'),
        name: yup.string().required('Toto pole je povinné!'),
        age: yup
            .number()
            .typeError('Zadejte číslo!')
            .min(18, 'Věk musí být mezí 18 - 99!')
            .max(99, 'Věk musí být mezí 18 - 99!'),
        message: yup.string(),
        gdpr: yup.boolean().isTrue('Toto pole je povinné!'),
        nwsl: yup.boolean(),
        file: yup.mixed().required('Toto pole je povinné!'),
        files: yup.array().min(1, 'Toto pole je povinné!').required('Toto pole je povinné!'),
        gender: yup.string().typeError('Toto pole je povinné!'),
    })
    .required();

const TestForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            age: '',
            message: '',
            gdpr: false,
            nwsl: false,
            file: undefined,
            files: [],
            gender: '',
        },
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-120 p-8">
            <TextInput
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder="E-mail"
                type="email"
            />
            <PasswordInput
                name="password"
                register={register}
                error={errors.password?.message}
                placeholder="Heslo"
                className="mt-4"
            />
            <TextInput
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="Jméno"
                className="mt-4"
            />
            <TextInput name="age" register={register} error={errors.age?.message} placeholder="Věk" className="mt-4" />
            <TextArea name="message" register={register} placeholder="Vaše zpráva" className="mt-4" />
            <Checkbox
                name="gdpr"
                register={register}
                error={errors.gdpr?.message}
                checked={watch('gdpr')}
                placeholder="Souhlasím se zpracováním osobních údajů"
                className="mt-4"
            />
            <Switch
                name="nwsl"
                register={register}
                checked={watch('nwsl')}
                placeholder="Chci začít odebírat novinky"
                className="mt-4"
            />
            <div className="py-4 border-y border-gray-300 mt-4">
                <RadioButtons
                    items={['Muž', 'Žena']}
                    name="gender"
                    value={watch('gender')}
                    register={register}
                    error={errors.gender?.message}
                />
            </div>
            <div className="pb-4 border-b border-gray-300 mt-4">
                <FileInput
                    name="file"
                    type="one"
                    register={register}
                    value={watch('file')}
                    onChange={(e) => setValue('file', e, { shouldValidate: true })}
                    filter="image"
                    error={errors.file?.message}
                />
            </div>
            <div className="pb-4 border-b border-gray-300 mt-4">
                <FileInput
                    name="files"
                    type="many"
                    register={register}
                    values={watch('files')}
                    onChange={(e) => setValue('files', e, { shouldValidate: true })}
                    error={errors.files?.message}
                />
            </div>
            <Button type="primary" submit className="mt-6">
                Odeslat
            </Button>
        </form>
    );
};

export { TestForm };
