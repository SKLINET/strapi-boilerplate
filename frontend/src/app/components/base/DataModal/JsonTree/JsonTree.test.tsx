import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JsonTree } from './JsonTree';

const data = {
    title: 'Home',
    id: 6,
    anchor: null,
    content: [
        { __typename: 'ComponentBlocksVideoBlock', video: { externalVideo: 'https://youtu.be/x' } },
        { __typename: 'ComponentBlocksFormBlock' },
    ],
};

describe('JsonTree', () => {
    it('should render top-level leaves with their values', () => {
        render(<JsonTree data={data} />);

        expect(screen.getByText('title')).toBeInTheDocument();
        expect(screen.getByText('"Home"')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getByText('null')).toBeInTheDocument();
    });

    it('should keep nested nodes collapsed until expanded', async () => {
        const user = userEvent.setup();
        render(<JsonTree data={data} />);

        const content = screen.getByRole('button', { name: /content/ });
        expect(content).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText('ComponentBlocksVideoBlock')).not.toBeInTheDocument();

        await user.click(content);
        expect(content).toHaveAttribute('aria-expanded', 'true');
        // Array items are labelled by their GraphQL type, so a list of blocks can be read at a glance.
        expect(screen.getByRole('button', { name: /0.*ComponentBlocksVideoBlock/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /1.*ComponentBlocksFormBlock/ })).toBeInTheDocument();
    });

    it('should expand every level when asked to', () => {
        render(<JsonTree data={data} expandDepth={Infinity} />);

        expect(screen.getByText('"https://youtu.be/x"')).toBeInTheDocument();
    });

    it('should mark the searched text', () => {
        const { container } = render(<JsonTree data={{ title: 'Hlavní stránka' }} highlight="stránka" />);

        expect(container.querySelector('mark')).toHaveTextContent('stránka');
    });
});
