import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Box, Flex, Typography, IconButton, inputFocusStyle } from '@strapi/design-system';
import { Earth, Bold, Code, StrikeThrough, Cross } from '@strapi/icons';
import ReactContentEditable from 'react-contenteditable';
import showdown from 'showdown';
import { parse, NodeType } from 'node-html-parser';

interface InputProps {
    name: string;
    value?: string;
    onChange: (e: any) => void;
    attribute: Record<any, any>;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    placeholder?: string;
    hint?: string;
}

const converter = new showdown.Converter();
converter.setOption('simpleLineBreaks', true);

const ContentEditable = styled(ReactContentEditable)`
    flex: 1;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.lineHeights[2]};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    background: ${({ theme }) => theme.colors.neutral0};
    padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
    color: ${({ theme }) => theme.colors.neutral800};
    ${inputFocusStyle()}

    b, strong {
        font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
`;

const Preview = styled.div`
    background: ${({ theme }) => theme.colors.neutral100};
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.lineHeights[1]};
    color: ${({ theme }) => theme.colors.neutral500};
`;

const executeCommand = (commandId: string, value?: string) => {
    // execCommand() is officially obsolete/deprecated but there's no alternative.
    // User agents cannot drop support for execCommand()
    // because so many services require support for it.
    document.execCommand(commandId, false, value);
};

const reduceParsed = (html: any, bold: boolean = false) => {
    return html.childNodes.reduce((a: any, c: any) => {
        if (c.nodeType === NodeType.TEXT_NODE) {
            return [...a, { type: 'text', text: c.text, bold: !!bold }];
        }

        if (c.nodeType === NodeType.ELEMENT_NODE && c.tagName === 'BR') {
            return [...a, { type: 'break' }];
        }

        if (c.nodeType === NodeType.ELEMENT_NODE && c.childNodes && (c.tagName === 'B' || c.tagName === 'STRONG')) {
            return [...a, ...reduceParsed(c, true)];
        }

        if (c.nodeType === NodeType.ELEMENT_NODE && c.childNodes && c.childNodes.length > 0) {
            return [...a, ...reduceParsed(c)];
        }

        return a;
    }, []);
};

const toMarkdown = (parsed: any, clear: any) => {
    return parsed.reduce((a: any, c: any) => {
        if (c.type === 'break' && !clear) {
            return `${a}  \n`;
        }

        if (c.type === 'text' && c.bold && !clear) {
            return `${a}**${clear ? c.text.replace(/(\n)/gm, '') : c.text}**`;
        }

        if (c.type === 'text') {
            return a + (clear ? c.text.replace(/(\n)/gm, '') : c.text);
        }

        return a;
    }, '');
};

const toHtml = (parsed: any, clear: any) => {
    return parsed.reduce((a: any, c: any) => {
        if (c.type === 'break' && !clear) {
            return clear ? a : `${a}<br>`;
        }

        if (c.type === 'text' && c.bold && !clear) {
            return `${a}<b>${c.text}</b>`;
        }

        if (c.type === 'text') {
            return a + c.text;
        }

        return a;
    }, '');
};

const getValueToUpdate = (html: any, markdown: any, clear?: any) => {
    const parsed = reduceParsed(parse(html));

    if (parsed.every((node: any) => node.type === 'break')) {
        return '';
    }

    return markdown ? toMarkdown(parsed, clear) : toHtml(parsed, clear);
};

const getHtml = (value: any, markdown: any) => {
    return value && markdown ? converter.makeHtml(value) : (value ?? '');
};

const Input = ({
    name,
    value,
    onChange,
    attribute,
    required,
    disabled,
    error,
    label,
    placeholder,
    hint,
}: InputProps) => {
    const ref = useRef();
    const [preview, setPreview] = useState(false);

    const markdown = !!(attribute.options && attribute.options.output === 'markdown');

    // Methods.
    const update = (value: any) => {
        onChange({ target: { name, value } });
    };

    const handleOnPaste = (event: any) => {
        event.preventDefault();
        const plainText = event.clipboardData.getData('text/plain');
        const html = event.clipboardData.getData('text/html');

        update(getValueToUpdate(html || plainText, markdown));
    };

    const handleOnChange = (event: any) => {
        update(getValueToUpdate(getHtml(event.target.value, markdown), markdown));
    };

    const handleOnClear = () => {
        update(getValueToUpdate(getHtml(value, markdown), markdown, true));
    };

    const handleOnPreview = () => {
        setPreview((preview) => !preview);
    };

    const handleOnKeyDown = (event: any) => {
        if (event.key === 'Escape') {
            // @ts-ignore
            ref?.current?.blur();
        }
    };

    const localized = Boolean(attribute?.pluginOptions?.i18n?.localized || false);

    const _disabled = Boolean(disabled || false);

    return (
        <Box>
            {label && (
                <Flex paddingBottom={1}>
                    <Typography variant="pi" fontWeight="bold" textColor="neutral800">
                        {label}
                    </Typography>
                    {required && (
                        <Typography variant="omega" fontWeight="bold" textColor="danger600">
                            *
                        </Typography>
                    )}
                    {localized && (
                        <Flex paddingLeft={1}>
                            <Earth width={12} height={12} />
                        </Flex>
                    )}
                </Flex>
            )}
            <Flex gap={2}>
                <ContentEditable
                    // @ts-ignore
                    innerRef={ref}
                    html={getHtml(value, markdown)}
                    onPaste={handleOnPaste}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    disabled={_disabled}
                />
                <IconButton
                    label="More actions"
                    withTooltip={false}
                    onClick={() => executeCommand('bold')}
                    disabled={_disabled}
                >
                    <Bold />
                </IconButton>
                <IconButton label="More actions" withTooltip={false} onClick={handleOnClear} disabled={_disabled}>
                    <StrikeThrough />
                </IconButton>
                <IconButton label="More actions" withTooltip={false} onClick={handleOnPreview} disabled={_disabled}>
                    {preview ? <Cross /> : <Code />}
                </IconButton>
            </Flex>
            {value && preview && (
                <Box marginTop={2}>
                    <Preview>{value}</Preview>
                </Box>
            )}
            {(error || hint) && (
                <Box paddingTop={1}>
                    {error ? (
                        <Typography variant="pi" textColor="danger600">
                            {error}
                        </Typography>
                    ) : (
                        <Typography variant="pi" textColor="neutral600">
                            {hint}
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Input;
