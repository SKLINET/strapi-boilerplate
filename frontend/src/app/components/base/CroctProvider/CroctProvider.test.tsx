import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@croct/plug-react', () => ({
    CroctProvider: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    useCroct: () => ({ track: vi.fn(), identify: vi.fn() }),
}));

import { CroctProvider } from './CroctProvider';

describe('CroctProvider', () => {
    it('should render children when no Croct app id is configured', () => {
        render(
            <CroctProvider>
                <p>App children</p>
            </CroctProvider>,
        );

        expect(screen.getByText('App children')).toBeInTheDocument();
    });
});
