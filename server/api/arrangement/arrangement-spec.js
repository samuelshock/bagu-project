(function() {
  var app, request, should;

  should = require('should');

  app = require('../../app');

  request = require('supertest');

  describe('GET /api/arrangements', function() {
    return it('should respond with JSON array', function(done) {
      return request(app).get('/api/arrangements').expect(200).expect('Content-Type', /json/).end((function(_this) {
        return function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be["instanceof"](Array);
          return done();
        };
      })(this));
    });
  });

}).call(this);

//# sourceMappingURL=arrangement-spec.js.map
