import React, { ChangeEvent, ReactElement, useMemo } from 'react';
import styles from './FileInput.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { UseFormRegister } from 'react-hook-form';

import { IconProps } from '../Icon/Icon';
import { ButtonProps } from '../Button/Button';

const Icon = dynamic<IconProps>(import('../Icon/Icon').then((mod) => mod.Icon));
const Button = dynamic<ButtonProps>(import('../Button/Button').then((mod) => mod.Button));

export type IFile = File | undefined;
export type IFiles = File[];

export type FileInputProps = {
    name: string;
    type: 'one' | 'many';
    filter?: 'image' | null;
    register: UseFormRegister<any>;
    error?: string | undefined;
    className?: string;
} & (
    | {
          type: 'one';
          value: IFile;
          values?: never;
          onChange: (e: IFile) => void;
      }
    | {
          type: 'many';
          value?: never;
          values: IFiles;
          onChange: (e: IFiles) => void;
      }
);

const FileInput = ({
    name,
    type,
    filter,
    value,
    values,
    onChange,
    register,
    error,
    className,
}: FileInputProps): ReactElement => {
    const data = register(name);
    const _value: File[] = type === 'one' ? (value ? [value] : []) : values;

    const accept = useMemo(() => {
        switch (filter) {
            case 'image':
                return 'image/png, image/jpeg';
            default:
                return '*';
        }
    }, [filter]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files: File[] = type === 'one' ? [] : _value;

        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i]);
            }
        }

        if (type === 'one') {
            onChange(files[0] || undefined);
        } else {
            onChange(files);
        }

        e.target.value = '';
    };

    const clearInput = (e: number | 'all') => {
        if (type === 'one') {
            onChange(undefined);
        } else {
            if (e === 'all') {
                onChange([]);
            } else {
                const _newFiles: File[] = [];

                for (let i = 0; i < _value.length; i++) {
                    if (i !== e) {
                        _newFiles.push(_value[i]);
                    }
                }

                onChange(_newFiles);
            }
        }
    };

    const input = (
        <input
            type="file"
            name={data.name}
            onChange={handleOnChange}
            autoComplete="off"
            accept={accept}
            multiple={type === 'many'}
            className={styles.input}
        />
    );

    const renderOneTypeContent = () => (
        <>
            {_value.length > 0 ? (
                <div className={styles.selectedItem}>
                    <span className={styles.fileName}>{_value[0].name}</span>
                    <Icon name="trash" className={styles.removeIcon} onClick={() => clearInput('all')} />
                </div>
            ) : (
                <label className={styles.defaultView}>
                    <Button type="secondary">Načíst soubor</Button>
                    {input}
                </label>
            )}
        </>
    );

    const renderManyTypeContent = () => (
        <>
            {_value.length > 0 && (
                <div className={styles.selectMoreView}>
                    {_value.map((e, i) => (
                        <div className={styles.selectedItem} key={i}>
                            <span className={styles.fileName}>{e.name}</span>
                            <Icon name="trash" className={styles.removeIcon} onClick={() => clearInput(i)} />
                        </div>
                    ))}
                </div>
            )}
            <label className={styles.defaultView}>
                <Button type="secondary">Načíst soubory</Button>
                {input}
            </label>
        </>
    );

    return (
        <div className={clsx(styles.wrapper, className)}>
            <div className={clsx(styles.inputWrapper, styles[type])}>
                {type === 'one' ? renderOneTypeContent() : renderManyTypeContent()}
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export { FileInput };
