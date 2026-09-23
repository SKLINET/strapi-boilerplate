import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('next/web-vitals', () => ({
    useReportWebVitals: vi.fn(),
}));

import { WebVitals } from './WebVitals';
import { useReportWebVitals } from 'next/web-vitals';

describe('WebVitals', () => {
    it('should render nothing and register the web vitals reporter', () => {
        const { container } = render(<WebVitals />);

        expect(container).toBeEmptyDOMElement();
        expect(useReportWebVitals).toHaveBeenCalled();
    });
});
