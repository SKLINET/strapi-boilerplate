'use client';

import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { ParallaxProps } from 'react-scroll-parallax';

const _Parallax = dynamic(() => import('react-scroll-parallax').then((mod) => mod.Parallax));

const Parallax = ({ children, className, ...props }: ParallaxProps): ReactElement => (
    <_Parallax {...props} className={className}>
        {children}
    </_Parallax>
);

export { Parallax };
