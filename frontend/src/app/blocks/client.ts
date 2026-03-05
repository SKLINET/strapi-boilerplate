// Dynamicly import block on server when blocks are rendered

export const loadBlock = async (blockType: string, isTemplateBlock: boolean) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`✅ ${isTemplateBlock ? 'Template' : 'Basic'} block:`, blockType);
    }

    return import(`./${blockType}/${blockType}`).catch((error) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`❌ Error loading block:`, error);
        }
        return null;
    });
};
