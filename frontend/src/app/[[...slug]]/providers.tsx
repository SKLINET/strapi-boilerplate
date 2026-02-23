'use client';

import { ParallaxProvider } from 'react-scroll-parallax';
import { CroctProvider } from '../components/base/CroctProvider/CroctProvider';

interface ProvidersProps {
    children: React.ReactNode;
    userId?: string;
}

export function Providers({ children, userId }: ProvidersProps) {
    return (
        <CroctProvider userId={userId}>
            <ParallaxProvider>{children}</ParallaxProvider>
        </CroctProvider>
    );
}
