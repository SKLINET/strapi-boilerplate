import React, { Fragment, ReactElement } from 'react';
import styles from './RichText.module.scss';
import clsx from 'clsx';
import parse from 'html-react-parser';
import { DOMNode, domToReact, HTMLReactParserOptions, Element, Text } from 'html-react-parser';
import { v4 } from 'uuid';
import { nbsp } from '@symbio/headless/utils';
import { isInternalLink } from '@symbio/headless';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';
import { Blockquote } from '../Blockquote/Blockquote';
import { Link } from '../Link/Link';
import { Image } from '../Image/Image';
import { List } from '../List/List';
import { Table } from '../Table/Table';

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
                        if (
                            isInternalLink(linkParams.href) &&
                            !linkParams.href.startsWith('mailto') &&
                            !linkParams.href.startsWith('tel')
                        ) {
                            return (
                                <Link key={v4()} href={linkParams.href} {...linkParams}>
                                    {domNode.children ? (
                                        <>{domToReact(domNode.children as DOMNode[], parserOptions)}</>
                                    ) : (
                                        <></>
                                    )}
                                </Link>
                            );
                        } else {
                            return (
                                <a key={v4()} {...linkParams}>
                                    {domToReact(domNode.children as DOMNode[], parserOptions)}
                                </a>
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
                            <Heading key={v4()} tag={domNode.name} className={clsx(align && styles[align])}>
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
                        return (
                            <Paragraph key={v4()} className={clsx(align && styles[align])}>
                                {domToReact(domNode.children as DOMNode[], parserOptions)}
                            </Paragraph>
                        );
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

                case 'blockquote':
                    if (domNode.children && domNode.children.length > 0) {
                        return (
                            <Blockquote key={v4()}>
                                {domToReact(domNode.children as DOMNode[], parserOptions)}
                            </Blockquote>
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
                        return <Image src={src} alt={alt} {...attribs} />;
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
