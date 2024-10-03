import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { Status, Typography } from '@strapi/design-system';
import { PLUGIN_ID } from '../pluginId';

const StyledStatus = styled(Status)`
    width: min-content;
`;

interface AddColumnToTableHookProps {
    displayedHeaders: any[];
    layout: any;
}

const addColumnToTableHook = ({ displayedHeaders, layout }: AddColumnToTableHookProps) => {
    const pluginOptions = get(layout, `options.${PLUGIN_ID}`);

    if (!pluginOptions) return { displayedHeaders, layout };

    return {
        displayedHeaders: [
            ...displayedHeaders,
            {
                name: pluginOptions.fieldName,
                attribute: { type: 'string' },
                label: 'Tags',
                searchable: true,
                sortable: true,
                cellFormatter(cellData: any) {
                    const tagKey = cellData[pluginOptions.fieldName] ?? pluginOptions.defaultTag;
                    const tagProperties = pluginOptions.tags[tagKey] || pluginOptions.tags[pluginOptions.defaultTag];
                    const tagColor = tagProperties.color;

                    return (
                        <StyledStatus showBullet={false} variant={tagColor} size="S">
                            <Typography fontWeight="bold" textColor={`${tagColor}700`}>
                                {tagKey}
                            </Typography>
                        </StyledStatus>
                    );
                },
            },
        ],
        layout,
    };
};

export default addColumnToTableHook;
