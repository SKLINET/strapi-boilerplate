import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const dependencies = vi.hoisted(() => ({ withoutScripts: false }));

vi.mock('../WithoutScripts/WithoutScripts', () => ({
    WithoutScripts: ({ children }: { children: unknown }) => (dependencies.withoutScripts ? null : children),
}));

vi.mock('@next/third-parties/google', () => ({
    GoogleTagManager: ({ gtmId }: { gtmId: string }) => <div>gtm-{gtmId}</div>,
}));

import { Analytics } from './Analytics';

beforeEach(() => {
    dependencies.withoutScripts = false;
});

describe('Analytics', () => {
    it('should render the GTM snippet when a code is provided', () => {
        render(<Analytics gtmCode="GTM-TEST" />);

        expect(screen.getByText('gtm-GTM-TEST')).toBeInTheDocument();
    });

    it('should render nothing when analytics are switched off', () => {
        const { container } = render(<Analytics gtmCode={null} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render no scripts at all when the request asked for a script-free page', () => {
        // The point of the wrapper: an audit request must not receive the scripts server-side.
        dependencies.withoutScripts = true;

        const { container } = render(<Analytics gtmCode="GTM-TEST" />);

        expect(container).toBeEmptyDOMElement();
        expect(screen.queryByText('gtm-GTM-TEST')).not.toBeInTheDocument();
    });
});
