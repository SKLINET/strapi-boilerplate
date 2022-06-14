import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { BlockWrapper } from '../../base/BlockWrapper/BlockWrapper';
import { TestBlockContent, TestBlockProps } from '../../../blocks/TestBlock/TestBlock';
import { Heading } from '../../primitives/Heading/Heading';
import styles from './Test.module.scss';

export type TestProps = Omit<TestBlockProps, 'content'> & Omit<TestBlockContent, 'id' | '__typename'>;

export const Test = ({ className, app, ...props }: TestProps): ReactElement => (
    <BlockWrapper className={clsx(styles.blockWrapper, className)}>
        <Heading tag={'h2'} className="mt-6">
            TestBlock
        </Heading>
        <pre className="p-8 bg-gray-300 w-full">{JSON.stringify(props, undefined, '    ')}</pre>
    </BlockWrapper>
);
