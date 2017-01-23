var cheerio = require('cheerio');
var CachebusterOptions = require('./CachebusterOptions.js');

/**
 *
 * @param {CachebusterOptions} [options]
 * @property {CachebusterOptions} _options
 *
 * @constructor
 */
var Cachebuster = function (options) {
  this._options = options || new CachebusterOptions();
};

Cachebuster.prototype = {

  /**
   *
   * @param {string} htmlString
   * @returns {string}
   */
  bust: function (htmlString) {
    var parsed = cheerio.load(htmlString, {decodeEntities: false});
    this._processParsedData(parsed);
    return parsed.html();
  },

  /**
   *
   * @param file
   */
  bustVinylFile: function (file) {
    if (file.isStream()) {
      throw new Error('File Stream not supported');
    }

    if (file.isDirectory()) {
      throw new Error('Directories not supportet');
    }

    file.contents = new Buffer(this.bust(file.contents.toString()));
  },

  /**
   *
   * @param parsed
   * @private
   */
  _processParsedData: function (parsed) {
    var instance = this;

    this._options.getTagConfiguration().forEach(function (tagConfig) {
      instance._handleTagConfiguration(tagConfig, parsed);
    });
  },

  /**
   *
   * @param {TagConfiguration} tagConfig
   * @param parsed
   * @private
   */
  _handleTagConfiguration: function (tagConfig, parsed) {
    var instance = this;

    parsed(tagConfig.tagName).each(function (index, element) {
      tagConfig.urlAttributeNames.forEach(function (attrName) {
        var attrValue = element.attribs[attrName];
        if (attrValue) {
          element.attribs[attrName] = instance._processUrl(attrValue);
        }
      });
    });
  },

  /**
   *
   * @param {string} url
   *
   * @returns {string}
   *
   * @private
   */
  _processUrl: function (url) {
    var searchMap = this._getSearchMapFromUrl(url);
    searchMap[this._options.getSearchParameterName()] = this._options.getHash();
    return this._applySearchMapToUrl(url, searchMap);
  },

  /**
   *
   * @param {string} url
   * @return {{}}
   * @private
   */
  _getSearchMapFromUrl: function (url) {
    var map = {};

    var searchStringStartIndex = url.indexOf('?');
    if (searchStringStartIndex == -1 || searchStringStartIndex == url.length) {
      return map;
    }

    var searchString = url.substring(searchStringStartIndex + 1);
    var parts = searchString.split('&');

    parts.forEach(function (part) {
      if (part != '') {
        var subParts = part.split('=');
        map[subParts[0]] = subParts[1];
      }
    });

    return map;
  },

  /**
   *
   * @param {string} url
   * @param {{}} map
   * @returns {string}
   */
  _applySearchMapToUrl: function (url, map) {
    var baseUrl = url;

    var searchStringStartIndex = url.indexOf('?');
    if (searchStringStartIndex >= 0) {
      baseUrl = url.substring(0, searchStringStartIndex);
    }

    return baseUrl + this._createSearchStringFromMap(map);
  },

  _createSearchStringFromMap: function (map) {
    var searchString = '?';

    var first = true;

    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        if (!first) {
          searchString += '&';
        }

        var value = map[key];

        searchString += key + (value ? '=' + value : '');
        first = false;
      }
    }

    return searchString;
  }
};


module.exports = Cachebuster;
