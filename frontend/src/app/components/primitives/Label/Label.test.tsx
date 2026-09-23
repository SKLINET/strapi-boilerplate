import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
    it('should render the given text', () => {
        render(<Label>Caption</Label>);
        expect(screen.getByText('Caption')).toBeInTheDocument();
    });
});
