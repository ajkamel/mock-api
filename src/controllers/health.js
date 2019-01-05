// Absolute Imports
import deepExtend from 'deep-extend';

// Relative Imports
import BaseController from './utils/controller_factory';
import config from '../helpers/config_helper';
import ResponseHelper from '../helpers/response_helper';

// Status codes for ready checks
const StatusCodeError = 'error';
const StatusCodeOk = 'ok';

// All responses needed by this controller
class Responses {
  /**
   * Returns an object to use for health responses
   */
  static health() {
    // Get default response object
    const ret = ResponseHelper.defaultResponse();

    // NOTE: Resets data from array to object
    // Needed for other responses to work with `deepExtend`
    ret.data = {
      uptime: Math.round((Date.now() - config.application.start_time) / 1000),
    };

    return ret;
  }

  /**
   * Returns an object to use for ready responses
   */
  static async ready() {
    // NOTE: Object merge instead of Object.assign because deep copy
    return deepExtend({}, this.health(), {
      data: {
        service: StatusCodeOk,
      },
    });
  }

  /**
   * Returns an object to use for version responses
   */
  static version() {
    // NOTE: Object merge instead of Object.assign because deep copy
    return deepExtend({}, this.health(), {
      data: {
        version: config.application.release_version,
      },
    });
  }
}

// Controller to handle locale requests
// NOTE: Using object literal in order to have immutable binding
// Same object will be passed around on every require / import
const HealthController = function HealthController() {
  // Set base for inheritance
  const base = new BaseController();

  return Object.assign(Object.create(base), {
    /**
     * Serves all health requests
     */
    health: (req, res) => {
      res.status(200).json(Responses.health());
    },

    /**
     * Serves all ready requests
     */
    ready: async (req, res) => {
      // Get response template
      const resp = await Responses.ready();

      // response code: 500 if any check isn't 'ok', 200 otherwise
      const code = Object.keys(resp.data)
        .filter(status => status !== 'uptime' && resp.data[status] !== StatusCodeOk).length ? 500 : 200;

      res.status(code).json(resp);
    },

    /**
     * Serves all version requests
     */
    version: (req, res) => {
      res.status(200).json(Responses.version());
    },
  });
};

const healthController = HealthController();

export {
  healthController, Responses as healthResponses, StatusCodeError, StatusCodeOk,
};
