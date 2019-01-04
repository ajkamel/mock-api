import deepExtend from 'deep-extend';

import ResponseHelper from '../../helpers/response_helper';

// Base controller all other controllers can extend
class Controller {
  constructor(params = {}) {
    // Set up class params, with defaults
    this.params = deepExtend({}, {
      version: 1,
    }, params);
  }

  /**
   * Response methods
   */

  /**
   * Sends a Method Not Allowed response code and default JSON output
   */
  methodNotAllowed(req, res) {
    ResponseHelper.methodNotAllowed(req, res);
  }

  /**
   * Sends a Not Found response code and default JSON output
   */
  notFound(req, res) {
    ResponseHelper.notFound(req, res);
  }
}

export default Controller;
