/* eslint-disable */
const dotenv = require('dotenv');
const fs = require('fs').promises;
const { generateModels } = require('./generateModels');
const appDir = process.cwd();
const axios = require('axios');

dotenv.config();
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN_FULL}`;

const toPascal = (s) => {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

const toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

generateModels().then(() => {
    const models = require('../src/models.json');
    Promise.all([
        fs.readFile('./src/data/blockTemplate/Block.tsx.tpl'),
        fs.readFile('node_modules/@symbio/headless/data/componentTemplate/Component.tsx.tpl'),
        fs.readFile('node_modules/@symbio/headless/data/componentTemplate/Component.module.scss.tpl'),
        fs.readFile('node_modules/@symbio/headless/data/componentTemplate/Component.stories.tsx.tpl'),
    ]).then(([blockTemplate, componentTemplate, scssTemplate, storiesTemplate]) => {
        const createBlockTemplate = async (blockName, componentName, fields) => {
            const dir = `./src/blocks/${blockName}`;
            try {
                await fs.access(dir, (fs.constants || fs).R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error('Making dir for block ' + dir);
                    await fs.mkdir(dir);
                }
            }

            const file = `${dir}/${blockName}.tsx`;
            try {
                await fs.access(file, (fs.constants || fs).R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error('Creating block ' + file);
                    const contentBlocks = await axios.get('http://localhost:1337/api/content-type-builder/components');
                    const contentTypes = await axios.get(
                        'http://localhost:1337/api/content-type-builder/content-types',
                    );
                    const allComponents = contentBlocks.data.data.filter(
                        (property) => property.category === 'complementary',
                    );
                    const allBlocks = contentBlocks.data.data.filter((property) => property.category === 'block');
                    const allContentTypes = contentTypes.data.data;
                    const currentBlock = allBlocks.filter((block) => toPascal(block.apiId) === blockName);
                    const fieldsGql = currentBlock
                        .map((block) => {
                            if (block.schema) {
                                // GET SCHEMA FIELDS
                                const fieldNames = Object.entries(block.schema);
                                return fieldNames.map((name) => {
                                    if (name[1].type === 'media') {
                                        return `${name[0]}{data{...appImageFragment @relay(mask: false)}}`;
                                    } else if (name[1].type === 'component') {
                                        if (name[1].component.includes('button')) {
                                            return `${name[0]}{data{...appButtonFragment @relay(mask: false)}}`;
                                        } else {
                                            const blocksComponent = name[1].component;
                                            const filteredComponent = allComponents.filter(
                                                (component) => component.uid === blocksComponent,
                                            );
                                            const componentFieldsArr = Object.entries(filteredComponent[0].schema);
                                            const componentFields = componentFieldsArr.map((field) => {
                                                if (field[1].type === 'media') {
                                                    return `${field[0]}{data{...appImageFragment @relay(mask: false)}}`;
                                                } else if (field[1].type === 'relation') {
                                                    return `${field[0]}{${
                                                        field[1].target === 'api::icon.icon'
                                                            ? 'data{...appIconFragment @relay(mask: false)}'
                                                            : 'data{id}'
                                                    }}`;
                                                } else return field[0];
                                            });
                                            return `${name[0]}{${componentFields}}`;
                                        }
                                    } else if (name[1].type === 'relation') {
                                        return `${name[0]}{${
                                            name[1].target === 'api::icon.icon'
                                                ? 'data{...appIconFragment @relay(mask: false)}'
                                                : 'data{id}'
                                        }}`;
                                    } else return name[0];
                                });
                            }
                        })
                        .filter((a) => a)
                        .join('\n');

                    await fs.writeFile(
                        `${dir}/${blockName}.tsx`,
                        blockTemplate
                            .toString('utf-8')
                            .replace(/{BLOCK_NAME}/g, blockName)
                            .replace(/{COMPONENT_NAME}/g, componentName)
                            .replace(/{FIELDS}/g, fieldsGql ? fieldsGql : ''),
                    );

                    await createComponentTemplate(componentName);
                }
            }
        };

        const createComponentTemplate = async (componentName) => {
            const dir = `./src/components/blocks/${componentName}`;
            try {
                await fs.access(dir, (fs.constants || fs).R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error('Making dir for block component ' + dir);
                    await fs.mkdir(dir);
                }
            }

            async function createFile(file, template, type = '') {
                try {
                    await fs.access(file, (fs.constants || fs).R_OK);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.error(`Creating block ${type} ${file}`);
                        await fs.writeFile(file, template.toString('utf-8').replace(/{NAME}/g, componentName));
                    }
                }
            }

            await createFile(`${dir}/${componentName}.tsx`, componentTemplate, 'component');
            await createFile(`${dir}/${componentName}.stories.tsx`, storiesTemplate, 'story');
            await createFile(`${dir}/${componentName}.module.scss`, scssTemplate, 'styles');
        };

        const generateBlocks = async () => {
            const contentBlocks = await axios.get('http://localhost:1337/api/content-type-builder/components');
            const blocksToCreate = contentBlocks.data.data.filter((property) => property.category === 'block');

            const names = [];
            for (const block of blocksToCreate) {
                if (block.category === 'block') {
                    const name = toPascal(block.apiId);
                    const componentName = name.replace(/Block$/, '');
                    const fields = block.schema ? Object.keys(block.schema) : [];
                    names.push([name, fields]);
                    await createBlockTemplate(name, componentName, fields);

                    names.sort();
                    await fs.writeFile(
                        `./src/blocks/index.ts`,
                        `import { graphql } from 'relay-runtime';

import dynamic from 'next/dynamic';
import { BlockType } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

${names
    .reduce((acc, [name]) => {
        acc.push(`import ${name} from './${name}/${name}';`);
        return acc;
    }, [])
    .join('\n')}
graphql\`
    fragment serverBlocksContent on PageBlocksDynamicZone {
        __typename
${names
    .map(([name, fields]) => (fields.length > 0 ? `        ...${name}_content @relay(mask: false)` : ''))
    .filter((a) => a)
    .join('\n')}
    }
\`;
const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } = {
${names
    .reduce((acc, [name]) => {
        acc.push(`              ${name},`);
        return acc;
    }, [])
    .join('\n')}
          };
export default blocks;
`,
                    );
                }
            }
        };
        generateBlocks();
    });
});
