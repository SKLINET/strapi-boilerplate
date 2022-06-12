import React, { useEffect, useState } from 'react';
// import { isMobile } from '@symbio/headless/utils';

interface ImportProps {
    touch: () => Promise<any>;
    desktop: () => Promise<any>;
    children: (comp: any) => JSX.Element;
}

export function Import({ touch, desktop, children }: ImportProps) {
    const [Component, setComponent] = useState<any>(null);

    useEffect(() => {
        // Assign a callback with an import() call
        // const importCallback = isMobile() ? touch : desktop;
        const importCallback = desktop;

        // Executes the 'import()' call that returns a promise with
        // component details passed as an argument
        importCallback().then((componentDetails) => {
            // Set the import data in the local state
            setComponent(componentDetails);
        });
    }, [desktop, touch]);

    // The actual component is assigned to the 'default' prop
    return children(Component ? Component.default : () => null);
}
