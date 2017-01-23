var expect = require('chai').expect;
var cachebuster = require('../index.js');

describe('cachebuster', function () {

  /**
   * hash searchParametername = cachebusterHash
   * hash = 542320bdfsg
   *
   *
   * @param input
   * @param desiredOutput
   */
  var linkBaseTest = function (input, desiredOutput) {
    var options = new cachebuster.CachebusterOptions();
    options.setSearchParameterName('cachebusterHash');
    options.setHash('542320bdfsg');

    var output = cachebuster.bust(input, options);

    expect(output).to.equal(desiredOutput);
  };

  it('html string not modified', function () {
    var input = '<div class="Test">Just a Random Text</div>';
    var output = cachebuster.bust(input);

    expect(input).to.equal(output);
  });

  it('search string appended to simple url', function () {
    var input = '<link rel="import" href="/test.html">';
    var desiredOutput = '<link rel="import" href="/test.html?cachebusterHash=542320bdfsg">';

    linkBaseTest(input, desiredOutput);
  });

  it('search string appended to url with an existing search string', function () {
    var input = '<link rel="import" href="/test.html?param=value">';
    var desiredOutput = '<link rel="import" href="/test.html?param=value&cachebusterHash=542320bdfsg">';

    linkBaseTest(input, desiredOutput);
  });
});
