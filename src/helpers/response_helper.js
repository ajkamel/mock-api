import logger from '../utils/logger';

// Helper for responses throughout the application
class ResponseHelper {
  /**
   * Returns a default response object for use in controller handlers
   *
   * @param  {string} key The object key to use for response data
   *                      Default: 'data'
   *
   * @return {object}     Default response object
   */
  static defaultResponse(key) {
    // Set default return value
    const ret = {
      meta: {},
    };

    // Set items key
    ret[key || 'data'] = [];

    return ret;
  }

  /**
   * Helper method for sending a Bad Request response code and possibly a set of errors
   */
  static badRequest(req, res, errors = []) {
    // Set response
    let resp = ResponseHelper.defaultResponse();

    // Check if errors were passed in
    if (errors && errors.length) {
      resp = ResponseHelper.defaultResponse('errors');
      resp.errors = errors;
    }

    res.status(400).json(resp);
  }

  /**
   * Returns an error response object for use in controller handlers
   *
   * @param {Object|Object[]} errors object(s) containing error messages
   * @returns {Object} response object
   */
  static genericError(errors) {
    const response = ResponseHelper.defaultResponse('errors');

    response.errors = Array.isArray(errors) ? errors : [errors];

    return response;
  }

  /**
   * Helper method for sending a Internal Server Error response code and default JSON output
   */
  static internalError(req, res, error = false) {
    // Log error is present
    if (error) {
      logger.error('internal server error', error);
      res.status(500).json(ResponseHelper.genericError(error));

      return;
    }

    res.status(500).json(ResponseHelper.defaultResponse());
  }

  /**
   * Helper method for sending a Method Not Allowed response code and default JSON output
   */
  static methodNotAllowed(req, res) {
    res.status(405).json(ResponseHelper.defaultResponse());
  }

  /**
   * Helper method for sending a Method Not Implemented response code and default JSON output
   */
  static methodNotImplemented(req, res) {
    res.status(501).json(ResponseHelper.defaultResponse());
  }

  /**
   * Helper method for sending a Not Found response code and default JSON output
   */
  static notFound(req, res) {
    res.status(404).json(ResponseHelper.defaultResponse());
  }

  /**
   * Helper method for sending an OK response code and data
   */
  static ok(req, res, data = ResponseHelper.defaultResponse()) {
    res.status(200).json(data);
  }
}

export default ResponseHelper;
