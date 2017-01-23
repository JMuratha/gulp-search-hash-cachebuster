var expect = require('chai').expect;
var File = require('vinyl');

var cachebuster = require('../index.js');

describe('gulp-search-hash-cachebuster', function () {
  it('html file', function () {

    var input = '<html><head><link rel="import" href="elements.html"></head><body><div class="Test"></div></body></html>';
    var desiredOutput = '<html><head><link rel="import" href="elements.html?cachebusterHash=testhash"></head><body><div class="Test"></div></body></html>';

    var fakeFile = new File({
      contents: new Buffer(input)
    });

    var options = new cachebuster.CachebusterOptions();
    options.setHash('testhash');
    options.setSearchParameterName('cachebusterHash');
    var buster = new cachebuster.Cachebuster(options);

    buster.bustVinylFile(fakeFile);
    expect(fakeFile.contents.toString()).to.equal(desiredOutput);
  });
});
