/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import {
    Field,
    FieldLabel,
    FieldHint,
    FieldError,
    FieldInput,
    FieldAction,
} from "@strapi/design-system/Field";

const HomePage = () => {
    return (
        <>
            <BaseHeaderLayout title="Sklinet TinyMCE plugin" as="h2" />
            <Field name="text" hint="TinyMCE api key">
                <Stack spacing={1} size={50}>
                    <FieldLabel>API key</FieldLabel>
                    <FieldInput placeholder="Key" onChange={() => {}} />
                    <FieldHint />
                </Stack>
            </Field>
        </>
    );
};

export default memo(HomePage);
