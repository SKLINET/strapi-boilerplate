import React, { Fragment, ReactElement } from 'react';
import styles from './RichText.module.scss';
import dynamic from 'next/dynamic';
import config from '../../../../sklinet.config.json';
import parse from 'html-react-parser';
import { DOMNode, domToReact, HTMLReactParserOptions, Element, Text } from 'html-react-parser';
import { v4 } from 'uuid';
import { nbsp } from '@symbio/headless/utils';
import { isInternalLink } from '@symbio/headless';

const Heading = dynamic(() => import('../Heading/Heading').then((mod) => mod.Heading));
const Paragraph = dynamic(() => import('../Paragraph/Paragraph').then((mod) => mod.Paragraph));
const Blockquote = dynamic(() => import('../Blockquote/Blockquote').then((mod) => mod.Blockquote));
const Link = dynamic(() => import('../Link/Link').then((mod) => mod.Link));
const Image = dynamic(() => import('../Image/Image').then((mod) => mod.Image));
const List = dynamic(() => import('../List/List').then((mod) => mod.List));
const Table = dynamic(() => import('../Table/Table').then((mod) => mod.Table));

export interface RichTextProps {
    content: string;
}

const parserOptions = new (class implements HTMLReactParserOptions {
    public replace(node: DOMNode): React.ReactElement | Record<string, unknown> | false | undefined {
        if (node.type === 'tag') {
            const domNode = node as unknown as Element;
            switch (domNode.name) {
                case 'a': {
                    const linkParams = domNode.attribs;
                    if (linkParams && domNode.children) {
                        delete linkParams.style;
                        if (isInternalLink(linkParams.href)) {
                            return (
                                <Link key={v4()} {...linkParams}>
                                    {domNode.children ? <>{domToReact(domNode.children, parserOptions)}</> : <></>}
                                </Link>
                            );
                        } else {
                            return (
                                <Link key={v4()} {...linkParams}>
                                    {domToReact(domNode.children, parserOptions)}
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
                            <Heading key={v4()} tag={domNode.name}>
                                {domToReact(domNode.children, parserOptions)}
                            </Heading>
                        );
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'table':
                    if (domNode.children) {
                        return <Table key={v4()}>{domToReact(domNode.children, parserOptions)}</Table>;
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'p':
                    if (domNode.children && domNode.children.length > 0) {
                        return <Paragraph key={v4()}>{domToReact(domNode.children, parserOptions)}</Paragraph>;
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'ul':
                    if (domNode.children && domNode.children.length > 0) {
                        return (
                            <List key={v4()} tag="ul">
                                {domToReact(domNode.children, parserOptions)}
                            </List>
                        );
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'ol':
                    if (domNode.children && domNode.children.length > 0) {
                        return (
                            <List key={v4()} tag="ol">
                                {domToReact(domNode.children, parserOptions)}
                            </List>
                        );
                    } else {
                        return <Fragment key={v4()} />;
                    }

                case 'blockquote':
                    if (domNode.children && domNode.children.length > 0) {
                        return <Blockquote key={v4()}>{domToReact(domNode.children, parserOptions)}</Blockquote>;
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
                        return (
                            <div className={styles.image}>
                                <Image src={src} alt={alt} {...attribs} />
                            </div>
                        );
                    }
                    break;
                }

                case 'b': {
                    return <strong key={v4()}>{domToReact(domNode.children || [], parserOptions)}</strong>;
                }

                case 'i': {
                    return <em key={v4()}>{domToReact(domNode.children || [], parserOptions)}</em>;
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

RichText.whyDidYouRender = config.whyDidYouRender.active;

export { RichText };
