const builders = require('./server/services/builders');

module.exports = (plugin) => {
    const services = plugin.services;
    plugin.services = {
        ...services,
        builders,
    }
    return plugin;
}
