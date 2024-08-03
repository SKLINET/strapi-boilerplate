# Cloudinary

This plugin provides the cloudinary SDK (API client and utilities).

It depends on the [Cloudinary SDK](https://github.com/cloudinary/cloudinary_npm) package which is declared in the _top level_ `package.json` rather than the local one to make app building simpler.

For testing, the Cloudinary API is mocked using [nock](https://github.com/nock/nock). Check out `test/setup.js` to see how.
