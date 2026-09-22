import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialButton } from './SocialButton';

const app = {
    systemResources: [{ codename: 'go_to_value', value: 'Go to {value}' }],
} as any;

describe('SocialButton', () => {
    it('should render a facebook link that opens in a new tab', () => {
        render(<SocialButton type="facebook" href="https://facebook.com/jmb" app={app} />);

        const link = screen.getByRole('link', { name: 'Go to facebook' });
        expect(link).toHaveAttribute('href', 'https://facebook.com/jmb');
        expect(link).toHaveAttribute('target', '_blank');
    });
});
