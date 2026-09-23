import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../../blocks/server', () => ({
    default: {
        FormBlock: ({ blocksData }: { blocksData: { id?: string } }) => <div>mocked-form-{blocksData?.id}</div>,
        ArticleDetailBlock: () => <div>mocked-article-detail</div>,
        ArticlesListBlock: () => <div>mocked-article-list</div>,
        VideoBlock: () => <div>mocked-video</div>,
    },
}));

import { Blocks } from './Blocks';

const app = { locale: 'cs' } as any;

const resolveChildren = async (el: { props?: { children?: unknown } }) => {
    const children = el?.props?.children;
    if (children == null) return children;
    if (Array.isArray(children)) {
        return Promise.all(children);
    }
    return children;
};

describe('Blocks', () => {
    it('should render a mocked block for a known __typename', async () => {
        const el = await Blocks({
            blocksData: [{ __typename: 'ComponentBlockFormBlock', id: 'form-1' }],
            app,
        });
        render(<>{await resolveChildren(el)}</>);

        expect(screen.getByText('mocked-form-form-1')).toBeInTheDocument();
    });

    it('should render nothing for null blocks data', async () => {
        const el = await Blocks({ blocksData: null, app });
        const { container } = render(<>{await resolveChildren(el)}</>);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render nothing for an unknown __typename', async () => {
        const el = await Blocks({
            blocksData: [{ __typename: 'ComponentBlockUnknown', id: 'x' }],
            app,
        });
        const { container } = render(<>{await resolveChildren(el)}</>);
        expect(container).toBeEmptyDOMElement();
    });
});
