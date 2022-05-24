import React, { ReactElement } from 'react';

export const DefaultCursor = (): ReactElement => {
    return (
        <div className="rounded-full w-8 h-8 backdrop-filter backdrop-invert transform-gpu -translate-x-1/2 -translate-y-1/2" />
    );
};
