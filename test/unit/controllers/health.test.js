// Absolute Imports
import chai from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// Relative imports
import { healthController, healthResponses } from '../../../src/controllers/health';

// Set up chai.should()
chai.should();

// Set up sinon-chai
chai.use(sinonChai);

describe('Health Controller', () => {
  let res = {};
  let sandbox;

  before(() => {
    // Create sinon sandbox
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    res = {
      status: sandbox.stub().returnsThis(), // NOTE: Makes stubs chain-able
      json: sandbox.stub(),
    };

    // Setup moxios
    moxios.install();
  });

  afterEach(() => {
    // Restore sinon sandbox
    sandbox.restore();
    res = {};
    moxios.uninstall();
  });

  describe('health method', () => {
    it('should call `status` with a 200 and `json` with a health response object', () => {
      // Call method
      healthController.health({}, res);

      // Verify stubs were called
      res.status.should.have.been.calledWith(200);
      res.json.should.have.been.calledWith(healthResponses.health());
    });
  });

  describe('version method', () => {
    it('should call `status` with a 200 and `json` with a version response object', () => {
      // Call method
      healthController.version({}, res);

      // Verify stubs were called
      res.status.should.have.been.calledWith(200);
      res.json.should.have.been.calledWith(healthResponses.version());
    });
  });

  describe('healthResponses.health method', () => {
    it('should return a health response object', () => {
      // Call method
      res = healthResponses.health();

      // Verify return value
      res.should.have.property('meta');
      res.should.have.property('data');
      res.should.have.nested.property('data.uptime');
    });
  });

  describe('healthResponses.version method', () => {
    it('should return a version response object', () => {
      // Call method
      res = healthResponses.version();

      // Verify return value
      res.should.have.property('meta');
      res.should.have.property('data');
      res.should.have.nested.property('data.uptime');
      res.should.have.nested.property('data.version');
    });
  });
});
