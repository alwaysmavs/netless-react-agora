const rewireLess = require('react-app-rewire-less');
const rewireYAML = require('react-app-rewire-yaml');
module.exports = function override(config, env) {
    config = rewireLess(config, env);
    config = rewireYAML(config, env);
    return config;
};
