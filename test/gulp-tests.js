var expect = require('chai').expect;
var File = require('vinyl');
var exec = require('child_process').exec;
var fs = require('fs');

var cachebuster = require('../index.js');

describe('gulp-search-hash-cachebuster', function () {
  it('fake file', function () {

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

  it('gulp-test-area testing', function (done) {
    exec('sh -c "cd gulp-test-area && ../node_modules/.bin/gulp"', function (error, stdout, stderror) {
      var resultFileData = fs.readFileSync('./gulp-test-area/dist/index.html', {encoding: 'utf8'});
      var expectedFileData = fs.readFileSync('./gulp-test-area/src/expected.index.html', {encoding: 'utf8'});
      expect(resultFileData).to.equal(expectedFileData);
      done();
    });
  });
});
