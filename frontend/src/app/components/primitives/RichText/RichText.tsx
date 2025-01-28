import React, { Fragment, ReactElement } from 'react';
import styles from './RichText.module.scss';
import clsx from 'clsx';
import parse from 'html-react-parser';
import { DOMNode, domToReact, HTMLReactParserOptions, Element, Text } from 'html-react-parser';
import { v4 } from 'uuid';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';
import { Link } from '../Link/Link';
import { Image } from '../Image/Image';
import { List } from '../List/List';
import { Table } from '../Table/Table';
import { nbsp } from '../../../../utils/nbsp';
import InnerHTML from 'dangerously-set-html-content';

export interface RichTextProps {
    content: string;
}

const parserOptions = new (class implements HTMLReactParserOptions {
    public replace(node: DOMNode): React.ReactElement | Record<string, unknown> | false | undefined {
        const domNode = node as unknown as Element;

        const getAlignment = () => {
            const style = domNode?.attribs?.style || '';

            if (style.includes('text-align: center')) return 'center';
            if (style.includes('text-align: right')) return 'right';
            if (style.includes('text-align: left')) return 'left';

            return null;
        };
        const align = getAlignment();

        // Remove style attributes
        if (domNode.attribs && domNode.attribs.style) {
            delete domNode.attribs.style;
        }

        if (node.type === 'tag') {
            switch (domNode.name) {
                case 'a': {
                    const linkParams = domNode.attribs;
                    if (linkParams && domNode.children) {
                        delete linkParams.style;
                        const href = linkParams.href || '';
                        const target = linkParams.target || '_self';

                        if (
                            href.startsWith('http') ||
                            href.startsWith('https') ||
                            href.startsWith('mailto:') ||
                            href.startsWith('tel:')
                        ) {
                            return (
                                <a
                                    href={href}
                                    target={target}
                                    key={v4()}
                                    aria-label={linkParams.title || 'Rich text link'}
                                >
                                    {domNode.children ? (
                                        <>{domToReact(domNode.children as DOMNode[], parserOptions)}</>
                                    ) : (
                                        <></>
                                    )}
                                </a>
                            );
                        } else {
                            return (
                                <Link
                                    href={href}
                                    openInNewTab={target === '_blank'}
                                    alt={linkParams.title || 'Rich text link'}
                                >
                                    {domToReact(domNode.children as DOMNode[], parserOptions)}
                                </Link>
                            );
                        }
                    } else {
                        return <Fragment key={v4()} />;
                    }
                }

                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    if (domNode.children) {
                        return (
                            <Heading
                                key={v4()}
                                tag={domNode.name}
                                className={clsx(align && styles[align])}
                                withoutAutosize
                            >
                                {domToReact(domNode.children as DOMNode[], parserOptions)}
                            </Heading>
                        );
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'table':
                    if (domNode.children) {
                        return <Table key={v4()}>{domToReact(domNode.children as DOMNode[], parserOptions)}</Table>;
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'p':
                    if (domNode.children && domNode.children.length > 0) {
                        const children = domToReact(domNode.children as DOMNode[], parserOptions);

                        // Cookiebot declaration
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (typeof children === 'object' && children?.props?.children === '[COOKIE_DECLARATION]') {
                            const scriptCmp = `<script id="CookieDeclaration" data-culture="cs" src="https://consent.cookiebot.com/f26a3d67-9a35-4fc2-be47-967232074783/cd.js" type="text/javascript" async />`;
                            return <InnerHTML html={scriptCmp} />;
                        }

                        return <Paragraph key={v4()}>{children}</Paragraph>;
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'ul':
                    if (domNode.children && domNode.children.length > 0) {
                        return (
                            <List key={v4()} tag="ul">
                                {domToReact(domNode.children as DOMNode[], parserOptions)}
                            </List>
                        );
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'ol':
                    if (domNode.children && domNode.children.length > 0) {
                        return (
                            <List key={v4()} tag="ol">
                                {domToReact(domNode.children as DOMNode[], parserOptions)}
                            </List>
                        );
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'iframe': {
                    const attribs = domNode.attribs;
                    if (attribs) {
                        delete attribs.width;
                        delete attribs.height;
                    }
                    return <iframe {...attribs} />;
                }

                case 'img': {
                    const attribs = domNode.attribs;
                    if (attribs) {
                        const src = attribs.src;
                        const alt = attribs.alt;
                        delete attribs.src;
                        delete attribs.alt;
                        return <Image src={src} alt={alt} placeholder="blur" sizes="100vw" {...attribs} />;
                    }
                    break;
                }

                case 'b': {
                    return (
                        <strong key={v4()}>{domToReact((domNode.children as DOMNode[]) || [], parserOptions)}</strong>
                    );
                }

                case 'i': {
                    return <em key={v4()}>{domToReact((domNode.children as DOMNode[]) || [], parserOptions)}</em>;
                }
            }
        }

        if (node.type === 'text') {
            const domNode = node as unknown as Text;
            return <>{nbsp(domNode.data)}</>;
        }

        return;
    }
})();

const RichText = ({ content }: RichTextProps): ReactElement<RichTextProps, 'div'> | null => (
    <>{parse(content, parserOptions)}</>
);

RichText.whyDidYouRender = true;

export { RichText };
