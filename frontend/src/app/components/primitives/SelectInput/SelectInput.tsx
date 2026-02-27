'use client';

import { ReactElement, useState, useRef, useEffect } from 'react';
import styles from './SelectInput.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { Icon } from '../Icon/Icon';
import { getSystemResource } from '../../../../utils/strapi/getSystemResource';
import { useOutsideClick } from '../../../../utils/hooks/useOutsideClick';
import { Text } from '../Text/Text';

interface SelectInputProps<T> {
    name: string;
    selectedItem: ISelectItem<T> | null | undefined;
    onChange: (e: ISelectItem<T> | null) => void;
    options?: ISelectItem<T>[];
    categoryOptions?: ICategoryOptions<T>[];
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    error?: string | null;
    required?: boolean;
    largeDropdown?: boolean;
    app: IApp;
    className?: string;
}

export type ISelectItem<T> = {
    typename?: 'select';
    id: string;
    title: string;
    data: T;
};

export type ICategoryOptions<T> = {
    title: string;
    options: ISelectItem<T>[];
};

function SelectInput<T>({
    name,
    selectedItem,
    onChange,
    options = [],
    categoryOptions = [],
    label,
    disabled,
    placeholder,
    error,
    required,
    largeDropdown,
    app,
    className,
}: SelectInputProps<T>): ReactElement {
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [useSearch, setUseSearch] = useState(false);

    const [focus, setFocus] = useState(false);

    useOutsideClick(ref, null, () => {
        if (!disabled) {
            setIsOpen(false);
            setFocus(false);

            if (selectedItem) {
                setSearch(selectedItem.title);
                setUseSearch(false);
            } else {
                setSearch('');
                setUseSearch(true);
            }
        }
    });

    useEffect(() => {
        if (focus) {
            setIsOpen(true);
        }
    }, [focus]);

    useEffect(() => {
        if (disabled || selectedItem !== undefined) {
            setIsOpen(false);

            if (selectedItem) {
                setSearch(selectedItem.title);
                setUseSearch(false);
            } else {
                setSearch('');
            }
        }
    }, [selectedItem, disabled]);

    const _options = useSearch ? options.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())) : options;
    const _categoryOptions = categoryOptions.reduce((prev, next) => {
        const _prev = prev;

        if (next.options.length > 0) {
            const _options = useSearch
                ? next.options.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
                : next.options;

            if (_options.length > 0) {
                _prev.push({ title: next.title, options: _options });
            }
        }

        return _prev;
    }, [] as ICategoryOptions<T>[]);

    const renderItem = (e: ISelectItem<T>) => {
        const active = (selectedItem && selectedItem.id === e.id) || false;
        return (
            <button
                key={e.id}
                type="button"
                onClick={() => onChange(active ? null : e)}
                className={clsx(styles.item, active && styles.active)}
                aria-label={e.title}
            >
                {e.title}
            </button>
        );
    };

    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && (
                <Text className={styles.label}>
                    {label}
                    {required && <span className={styles.required}> *</span>}
                </Text>
            )}
            <div
                className={clsx(styles.inner, (focus || isOpen) && styles.open, selectedItem && styles.filled)}
                ref={ref}
            >
                <div
                    className={clsx(
                        styles.search,
                        focus && styles.focus,
                        error && styles.error,
                        disabled && styles.disabled,
                    )}
                >
                    <div className={styles.wrapperInput}>
                        <input
                            name={name}
                            type="text"
                            autoComplete="off"
                            disabled={disabled}
                            value={search}
                            onChange={(e) => {
                                if (useSearch) {
                                    setSearch(e.target.value);
                                } else {
                                    setSearch('');
                                    setUseSearch(true);
                                }
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            placeholder={placeholder}
                            className={styles.input}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();

                                    if ((_categoryOptions.length > 0 || _options.length > 0) && search.length > 0) {
                                        if (_categoryOptions.length > 0) {
                                            onChange(_categoryOptions[0]?.options[0] || null);
                                        } else {
                                            onChange(_options[0] || null);
                                        }
                                    } else {
                                        onChange(null);
                                    }

                                    setSearch('');
                                    setUseSearch(false);
                                    setFocus(false);
                                    setIsOpen(false);

                                    inputRef.current?.blur();
                                }
                            }}
                            ref={inputRef}
                        />
                        {selectedItem && (
                            <button
                                type="button"
                                onClick={() => onChange(null)}
                                className={styles.crossButton}
                                aria-label={getSystemResource('clear_select', app?.systemResources)}
                            >
                                <Icon name="cross" className={styles.icon} />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className={styles.arrowButton}
                            aria-label={
                                isOpen
                                    ? getSystemResource('hide_select', app?.systemResources)
                                    : getSystemResource('open_select', app?.systemResources)
                            }
                        >
                            <Icon name="chevronDown" className={styles.icon} />
                        </button>
                    </div>
                </div>
                <div className={clsx(styles.list, largeDropdown && styles.largeDropdown, 'hideScrollbar')}>
                    {_categoryOptions.length > 0 ? (
                        <>
                            {_categoryOptions.map((e) => (
                                <div key={e.title} className={styles.category}>
                                    <Text className={styles.categoryTitle}>{e.title}</Text>
                                    {e.options.map((item) => renderItem(item))}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>{_options.map((e) => renderItem(e))}</>
                    )}
                    {_categoryOptions.length === 0 && _options.length === 0 && (
                        <Text className={styles.emptyList}>
                            {getSystemResource('empty_select_list', app?.systemResources)}
                        </Text>
                    )}
                </div>
            </div>
            {error && <Text className={styles.errorMessage}>{error}</Text>}
        </div>
    );
}

export { SelectInput };
