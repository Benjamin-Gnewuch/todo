var chai = require('chai');
var request = require('request');
var assert = chai.assert;

var app = require('./app.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

describe('Todos', function() {
  it('can be returned.', function(done) {
    request('http://localhost:' + port + '/todos/Ben', function(error, response, body) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });
  it('can be added.', function(done) {
    request({
      url: 'http://localhost:' + port + '/todo',
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({task: 'Test'})
    },
    function(error, response, body) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });
  it('can be finished.', function(done) {
    request({
      url: 'http://localhost:' + port + '/todoFinish/Test',
      method: 'DELETE'
    },
    function(error, response, body) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });
});
