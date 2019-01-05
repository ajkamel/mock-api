import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import BaseController from '../../../../src/controllers/utils/controller_factory';
import ResponseHelper from '../../../../src/helpers/response_helper';

// Get expect function
const { expect } = chai;

// Set up chai.should()
chai.should();

// Set up sinon-chai
chai.use(sinonChai);

describe('Controller Factory Class', () => {
  const params = {};
  const req = {};

  let testObject;
  let res;
  let sandbox;

  before(() => {
    // Create sinon sandbox
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    // Set up response
    res = {
      status: sandbox.stub().returnsThis(), // NOTE: Makes stubs chain-able
      json: sandbox.stub(),
    };

    // Set up test object
    testObject = new BaseController(params);
  });

  afterEach(() => {
    // Restore sinon sandbox
    sandbox.restore();
  });

  describe('constructor method', () => {
    it('should set up class params with default values', () => {
      // Verify params were set
      expect(testObject.params.version).to.equal(1);
    });
  });

  describe('response methods', () => {
    describe('methodNotAllowed method', () => {
      it('should call `status` with 405 and `json` with a default response object', () => {
        // Call method
        testObject.methodNotAllowed(req, res);

        // Verify stubs were called
        res.status.should.have.been.calledWith(405);
        res.json.should.have.been.calledWith(ResponseHelper.defaultResponse());
      });
    });

    describe('notFound method', () => {
      it('should call `status` with 404 and `json` with a default response object', () => {
        // Call method
        testObject.notFound(req, res);

        // Verify stubs were called
        res.status.should.have.been.calledWith(404);
        res.json.should.have.been.calledWith(ResponseHelper.defaultResponse());
      });
    });
  });
});
