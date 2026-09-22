import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@next/third-parties/google', () => ({
    GoogleTagManager: ({ gtmId }: { gtmId: string }) => <div>gtm-{gtmId}</div>,
}));

import { GtmProvider } from './GtmProvider';

describe('GtmProvider', () => {
    it('should render children when no gtm code is provided', () => {
        render(
            <GtmProvider gtmCode={null}>
                <p>Page</p>
            </GtmProvider>,
        );

        expect(screen.getByText('Page')).toBeInTheDocument();
        expect(screen.queryByText(/gtm-/)).not.toBeInTheDocument();
    });

    it('should render the mocked GTM snippet when a code is provided', () => {
        render(
            <GtmProvider gtmCode="GTM-TEST">
                <p>Page</p>
            </GtmProvider>,
        );

        expect(screen.getByText('Page')).toBeInTheDocument();
        expect(screen.getByText('gtm-GTM-TEST')).toBeInTheDocument();
    });
});
