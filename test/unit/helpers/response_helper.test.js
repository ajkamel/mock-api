import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import logger from '../../../src/utils/logger';
import ResponseHelper from '../../../src/helpers/response_helper';

// Set up chai.should()
chai.should();

// Set up sinon-chai
chai.use(sinonChai);

describe('Response Helper', () => {
  let res = {};
  let sandbox;

  before(() => {
    // Create sinon sandbox
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    // Set up response
    res = {
      status: sandbox.stub().returnsThis(), // NOTE: Makes stubs chain-able
      json: sandbox.stub(),
    };
  });

  afterEach(() => {
    // Restore sinon sandbox
    sandbox.restore();
  });

  describe('defaultResponse method', () => {
    it('should return a default response with passed in items key', () => {
      // Call method
      const resp = ResponseHelper.defaultResponse('not-data');

      // Verify return value
      resp.should.have.property('not-data');
      resp.should.not.have.property('data');
    });

    it('should return a default response with a default items key', () => {
      // Call method
      const resp = ResponseHelper.defaultResponse();

      // Verify return value
      resp.should.have.property('data'); // NOTE: 'data' is the default
    });
  });

  describe('various status response methods', () => {
    const tests = [
      { method: 'badRequest', code: 400 },
      { method: 'internalError', code: 500 },
      { method: 'methodNotAllowed', code: 405 },
      { method: 'methodNotImplemented', code: 501 },
      { method: 'notFound', code: 404 },
      { method: 'ok', code: 200 },
    ];

    it('should call `status` with the appropriate status code and `json` with a default response object', () => {
      // Loop through tests, asserting against each
      tests.forEach(test => {
        // Call method
        ResponseHelper[test.method]({}, res);

        // Verify stubs were called
        res.status.should.have.been.calledWith(test.code);
        res.json.should.have.been.calledWith(ResponseHelper.defaultResponse());
      });
    });
  });

  describe('badRequest method', () => {
    context('without errors passed in', () => {
      const expected = ResponseHelper.defaultResponse();

      it('should output a response with no errors', () => {
        // Call method
        ResponseHelper.badRequest({}, res);

        // Verify stub was called
        res.json.should.have.been.calledWith(expected);
      });
    });

    context('with errors passed in', () => {
      const expected = ResponseHelper.defaultResponse('errors');

      beforeEach(() => {
        // Set expected response
        expected.errors = [1234];
      });

      it('should output a response with passed in errors', () => {
        // Call method
        ResponseHelper.badRequest({}, res, [1234]);

        // Verify stub was called
        res.json.should.have.been.calledWith(expected);
      });
    });
  });

  describe('genericError method', () => {
    it('should return an error response with the passed error', () => {
      // Call method
      const resp = ResponseHelper.genericError({ message: 'foo' });

      // Verify return value
      resp.should.have.property('meta');
      resp.should.have.deep.property('errors', [{ message: 'foo' }]);
    });

    it('should return an error response with multiple passed errors', () => {
      // Call method
      const resp = ResponseHelper.genericError([{ message: 'foo' }, { message: 'bar' }]);

      // Verify return value
      resp.should.have.property('meta');
      resp.should.have.deep.property('errors', [{ message: 'foo' }, { message: 'bar' }]);
    });

    it('should return a default response with a default items key', () => {
      // Call method
      const resp = ResponseHelper.genericError();

      // Verify return value
      resp.should.have.property('meta');
      resp.should.have.property('errors');
    });
  });

  describe('internalError method', () => {
    beforeEach(() => {
      // Stub logger method
      sandbox.stub(logger, 'error');
    });

    it('should log an error when one is passed in', () => {
      // Call method
      ResponseHelper.internalError({}, res, new Error('foo'));

      // Verify stub was called
      logger.error.should.have.been.called;
    });
  });

  describe('ok method', () => {
    context('with data passed in', () => {
      const expected = ResponseHelper.defaultResponse('foo');

      it('should output a response with passed in data', () => {
        // Call method
        ResponseHelper.ok({}, res, expected);

        // Verify stub was called
        res.json.should.have.been.calledWith(expected);
      });
    });
  });
});
