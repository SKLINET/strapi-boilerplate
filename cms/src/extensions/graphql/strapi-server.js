const builders = require('./server/services/builders');
const typeRegistry = require('./server/services/type-registry');

module.exports = (plugin) => {
    const services = plugin.services;
    plugin.services = {
      ...services,
      builders: builders.default,
      'type-registry': typeRegistry.default,
    }
    return plugin;
}
