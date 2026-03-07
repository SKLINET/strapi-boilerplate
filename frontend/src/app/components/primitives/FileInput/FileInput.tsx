'use client';

import { ReactElement, ChangeEvent, DragEvent, useState } from 'react';
import styles from './FileInput.module.scss';
import clsx from 'clsx';
import { IFileInput } from '../../../../types/file';
import { IApp } from '../../../../types/base/app';
import { v4 as uuidv4 } from 'uuid';
import { Text } from '../Text/Text';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';
import { nbsp } from '../../../../utils/nbsp';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../../molecules/IconButton/IconButton';

interface FileInputProps {
    value: IFileInput[];
    onChange: (e: IFileInput[]) => void;
    onMaxSizeExceeded: (e: string) => void;
    onFileTypeError?: (e: string) => void;
    label?: string | null;
    error?: string | undefined;
    disabled?: boolean;
    placeholder?: string | null;
    required?: boolean;
    maxSize?: number | null;
    maxCount?: number | null;
    allowedFileTypes?: string[] | null;
    app: IApp;
    className?: string;
}

const FileInput = ({
    value,
    onChange,
    onMaxSizeExceeded,
    onFileTypeError,
    label,
    error,
    disabled,
    placeholder,
    required,
    maxSize,
    maxCount,
    allowedFileTypes,
    app,
    className,
}: FileInputProps): ReactElement => {
    const _maxCount = Math.max(1, maxCount || 1);
    const [isDragOver, setIsDragOver] = useState(false);

    const validateFileType = (file: File): boolean => {
        if (!allowedFileTypes || allowedFileTypes.length === 0) {
            return true;
        }

        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        const mimeType = file.type.toLowerCase();

        return allowedFileTypes.some((allowedType) => {
            const normalizedType = allowedType.toLowerCase();
            return (
                normalizedType === fileExtension ||
                normalizedType === mimeType ||
                (normalizedType.includes('/') && mimeType.startsWith(normalizedType.split('/')[0]))
            );
        });
    };

    const processFiles = (files: File[]) => {
        // File size validation
        const maxSizeExceeded = files.reduce((prev, next) => {
            if (maxSize && next.size > maxSize * 1024 * 1024) {
                return true;
            } else return prev;
        }, false);

        if (maxSizeExceeded && maxSize) {
            onMaxSizeExceeded(
                getSystemResource('file_size_error', app?.systemResources).replace('{value}', maxSize.toString()),
            );
            return;
        }

        // File type validation
        const invalidFileTypes = files.filter((file) => !validateFileType(file));

        if (invalidFileTypes.length > 0 && onFileTypeError) {
            const allowedTypesText = allowedFileTypes?.join(', ') || '';
            const errorMessage = getSystemResource('file_type_error', app?.systemResources)?.replace(
                '{allowedTypes}',
                allowedTypesText,
            );

            onFileTypeError(errorMessage);
            return;
        }

        const _files: IFileInput[] = files.map((file) => ({
            typename: 'file',
            id: uuidv4(),
            title: file.name,
            data: file,
        }));

        onChange(value.concat(_files).slice(0, _maxCount));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files: File[] = e.target.files ? [...e.target.files] : [];
        processFiles(files);
        e.target.value = '';
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files: File[] = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const removeFile = (e: IFileInput) => {
        const newValues = value.filter((k) => k.id !== e.id);

        onChange(newValues);
    };

    const disabledInput = disabled || (_maxCount === 1 && value.length > 0);

    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && (
                <Text className={styles.label}>
                    {label}
                    {required && <span className={styles.required}> *</span>}
                </Text>
            )}
            <div className={styles.inner}>
                <label
                    className={clsx(
                        styles.inputWrapper,
                        error && styles.withError,
                        disabledInput && styles.disabled,
                        isDragOver && styles.dragOver,
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Icon name="attachment" className={styles.icon} />
                    <Text tag="span" className={styles.placeholder}>
                        {nbsp(
                            placeholder ||
                                getSystemResource(
                                    _maxCount > 1 ? 'upload_attachments' : 'upload_attachment',
                                    app.systemResources,
                                ),
                        )}
                    </Text>
                    <input
                        type="file"
                        onChange={(e) => handleChange(e)}
                        value={undefined}
                        accept={allowedFileTypes && allowedFileTypes.length > 0 ? allowedFileTypes.join(',') : '*'}
                        disabled={disabledInput}
                        multiple={_maxCount > 1}
                        className={styles.input}
                    />
                </label>
                {value.length > 0 && (
                    <div className={styles.fileList}>
                        {value.map((e) => (
                            <div key={e.id} className={styles.fileItem}>
                                <Text className={styles.fileName}>{e.title}</Text>
                                <IconButton
                                    color="black"
                                    icon="cross"
                                    type="fill"
                                    onClick={() => removeFile(e)}
                                    alt={getSystemResource('remove_file', app.systemResources)}
                                    disabled={disabled}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <Text className={styles.errorMessage}>{error}</Text>}
        </div>
    );
};

export { FileInput };
