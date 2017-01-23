var crypto = require('crypto');

var defaultTagConfiguration = require('./defaultTagConfiguration.js');

/**
 *
 * @constructor
 */
var CachebusterOptions = function () {
  this._hash = null;
  this._tagConfiguration = null;
  this._searchParameterName = 'cachebusterHash'
};

CachebusterOptions.prototype = {

  /**
   *
   * @param {string|null} hash
   */
  setHash: function (hash) {
    this._hash = hash;
  },

  /**
   *
   * @returns {string}
   */
  getHash: function () {
    if (!this._hash) {
      this._hash = crypto.randomBytes(50).toString('hex');
    }

    return this._hash;
  },

  /**
   *
   * @param {TagConfiguration[]} tagConfiguration
   */
  setTagConfiguration: function (tagConfiguration) {
    this._tagConfiguration = tagConfiguration;
  },

  /**
   *
   * @return {TagConfiguration[]}
   */
  getTagConfiguration: function () {
    if (!this._tagConfiguration) {
      this._tagConfiguration = defaultTagConfiguration.configuration;
    }

    return this._tagConfiguration;
  },

  /**
   *
   * @param {string} searchParameterName
   */
  setSearchParameterName: function (searchParameterName) {
    this._searchParameterName = searchParameterName;
  },

  /**
   *
   * @return {string|}
   */
  getSearchParameterName: function () {
    return this._searchParameterName;
  }
};

module.exports = CachebusterOptions;
