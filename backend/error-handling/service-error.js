const ErrorStatusCodes = {
  Continue: 100,
  Switching_Protocols: 101,
  OK: 200,
  Created: 201,
  Accepted: 202,
  No_Content: 204,
  Reset_Content: 205,
  Partial_Content: 206,
  Multiple_Choices: 300,
  Moved_Permanently: 301,
  Found: 302,
  See_Other: 303,
  Not_Modified: 304,
  Temporary_Redirect: 307,
  Permanent_Redirect: 308,
  Bad_Request: 400,
  Unauthorized: 401,
  Payment_Required: 402,
  Forbidden: 403,
  Not_Found: 404,
  Method_Not_Allowed: 405,
  Not_Acceptable: 406,
  Proxy_Authentication_Required: 407,
  Request_Timeout: 408,
  Conflict: 409,
  Gone: 410,
  Length_Required: 411,
  Precondition_Failed: 412,
  Payload_Too_Large: 413,
  URI_Too_Long: 414,
  Unsupported_Media_Type: 415,
  Range_Not_Satisfiable: 416,
  Expectation_Failed: 417,
  Unprocessable_Entity: 422,
  Too_Many_Requests: 429,
  Internal_Server_Error: 500,
  Not_Implemented: 501,
  Bad_Gateway: 502,
  Service_Unavailable: 503,
  Gateway_Timeout: 504,
  HTTP_Version_Not_Supported: 505,
};

class ServiceError extends Error {
  constructor(message, code, originalError) {
    super(message);
    this.name = "ServiceError";
    this.serviceErrorCode = code;
    if (originalError) {
      this.original = originalError;
      this.new_stack = new Error().stack;
      let message_lines = (this.message.match(/\n/g) || []).length + 1;
      this.stack =
        this.stack
          .split("\n")
          .slice(0, message_lines + 1)
          .join("\n") +
        "\n" +
        originalError.stack;
    }
  }
}

module.exports = {
  ServiceError,
  ErrorStatusCodes,
};
