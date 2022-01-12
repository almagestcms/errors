class AlmagestCMSError extends Error {
  constructor(
    message,
    code,
    data,
    stack,
  ) {
    super(message);

    Object.defineProperties(this, {
      name: { value: 'AlmagestCMSError' },
      message: {
        value: message,
        enumerable: true,
        writable: true,
      },
      code: {
        value: code || 500,
        enumerable: true,
        writable: true,
      },
      data: {
        value: data ?? undefined,
        enumerable: data != null,
      },
    });

    if (stack) {
      this.stack = stack;
    }
    else {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AlmagestCMSError);
      }
      else {
        Object.defineProperty(this, 'stack', {
          value: Error().stack,
          writable: true,
          configurable: true
        });
      }
    }
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      data: this.data,
      stack: this.stack,
    }
  }
}

class BadGatewayError extends AlmagestCMSError {
  constructor(
    message = 'Bad Gateway',
    data,
  ) {
    super(
      message,
      502,
      data,
    );
  }
}

class GatewayTimeoutError extends AlmagestCMSError {
  constructor(
    message = 'Gateway Timeout',
    data,
  ) {
    super(
      message,
      504,
      data,
    );
  }
}

class BadRequestError extends AlmagestCMSError {
  constructor(
    message = 'Bad Request',
    data,
  ) {
    super(
      message,
      400,
      data,
    );
  }
}

class ConflictError extends AlmagestCMSError {
  constructor(
    message = 'Conflict',
    data,
  ) {
    super(
      message,
      409,
      data,
    );
  }
}

class InternalError extends AlmagestCMSError {
  constructor(
    message = 'Internal Error',
    data,
    stack,
  ) {
    super(
      message,
      500,
      data,
      stack,
    );
  }
}

class NotFoundError extends AlmagestCMSError {
  constructor(
    message = 'Not Found',
    data,
  ) {
    super(
      message,
      404,
      data,
    );
  }
}

class UnauthorizedError extends AlmagestCMSError {
  constructor(
    message = 'Unauthorized',
    data,
  ) {
    super(
      message,
      403,
      data,
    );
  }
}

module.exports = {
  AlmagestCMSError,
  BadGatewayError,
  GatewayTimeoutError,
  BadRequestError,
  ConflictError,
  InternalError,
  NotFoundError,
  UnauthorizedError
}
