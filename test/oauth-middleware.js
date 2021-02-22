const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const { validateJWT } = require('../middlewares/vallidate-jwt');
const sinon = require('sinon');

describe('Validate-jwt middleware', function() {
  it('req should have uid after decoding the token', function() {
    const req = {};
    req.cookies = {};
    req.cookies.apiKey = 'gdg56$#bbmbmm';
    const res = {
      send: function(){},
      json: function(d) {
         console.log("\n : " + d);
      },
      status: function(s) {
          this.statusCode = s;
          return this;
      }
    };
    
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ uid: 'abc' });
    validateJWT(req, res, {}, () => {});
    expect(req).to.have.property('uid', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
    });

  it('should throw an error if the token cannot be verified', function() {
    const req = {};
    req.cookies = {};
    req.cookies.apiKey = 'gdg56$#bbmbmm';
    const res = {
      send: function(){},
      json: function(d) {
         console.log("\n : " + d);
      },
      status: function(s) {
          this.statusCode = s;
          return this;
      }
    };
    expect(validateJWT.bind(this, req, {}, () => {})).to.throw();
  });

});
