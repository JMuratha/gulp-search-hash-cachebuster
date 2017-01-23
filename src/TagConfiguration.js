/**
 *
 * @param {string} tagName
 * @param {string[]} urlAttributeNames
 *
 * @property {string} tagName
 * @property {string[]} urlAttributeNames
 *
 * @constructor
 */
var TagConfiguration = function (tagName, urlAttributeNames) {
  this.tagName = tagName.toLocaleLowerCase();
  this.urlAttributeNames = urlAttributeNames;
};

module.exports = TagConfiguration;
