var CachebusterOptions = require('./src/CachebusterOptions.js');
var Cachebuster = require('./src/Cachebuster.js');
var TagConfiguration = require('./src/TagConfiguration.js');
var defaultTagConfiguration = require('./src/defaultTagConfiguration.js');

module.exports = {
  CachebusterOptions: CachebusterOptions,
  Cachebuster: Cachebuster,
  defaultTagConfiguration: defaultTagConfiguration,
  TagConfiguration: TagConfiguration,

  /**
   *
   * @param {string} htmlString
   * @param {CachebusterOptions} [options]
   * @returns {string}
   */
  bust: function (htmlString, options) {
    var buster = new Cachebuster(options);
    return buster.bust(htmlString);
  }
};
