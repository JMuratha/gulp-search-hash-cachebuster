var TagConfiguration = require('./TagConfiguration.js');

module.exports = {
  configuration: [
    new TagConfiguration('link', ['href']),
    new TagConfiguration('script', ['src'])
  ]
};
