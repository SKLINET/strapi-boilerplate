import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('nextjs-toploader', () => ({
    default: () => <div role="progressbar" aria-label="top loader" />,
}));

vi.mock('nprogress', () => ({
    default: { done: vi.fn(), start: vi.fn() },
}));

import { TopLoader } from './TopLoader';
import NProgress from 'nprogress';

describe('TopLoader', () => {
    it('should render the mocked top loader and mark progress done', () => {
        render(<TopLoader />);

        expect(screen.getByRole('progressbar', { name: 'top loader' })).toBeInTheDocument();
        expect(NProgress.done).toHaveBeenCalled();
    });
});
