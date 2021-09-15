class AlmagestCMSError extends Error {
  constructor(
    message,
    code,
    data,
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
  ) {
    super(
      message,
      500,
      data,
    );
  }
}

class NotFoundError extends AlmagestCMSError {
  constructor(
    message = 'Not Found',
    data,
  ) {
    if (typeof message === 'object') {
      const { resourceTypeName, propertyMap } = message;
      if (typeof resourceTypeName !== 'string') throw new Error('Resource type name must be string');
      if (typeof propertyMap !== 'object') throw new Error('Property map must be object');
      const propertyString = Object.keys(propertyMap)
        .filter(key => typeof propertyMap[key] !== 'undefined' && propertyMap[key] !== null)
        .map(key => `${key}: ${propertyMap[key]}`).join(', ');
      message = `${resourceTypeName} (${propertyString}) not found.`;
    }
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
