// Copy tinymce folder
const fse = require('fs-extra');
const path = require('path');
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce', 'langs'));
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true });
fse.copySync(path.join(topDir, 'node_modules', 'tinymce-i18n', 'langs7'), path.join(topDir, 'public', 'tinymce', 'langs'), { overwrite: true });
