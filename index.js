class AlmagestCMSError extends Error {
  constructor(
    message,
    statusCode,
    extensions,
  ) {
    super(message);

    Object.defineProperties(this, {
      name: { value: 'AlmagestCMSError' },
      message: {
        value: message,
        enumerable: true,
        writable: true,
      },
      statusCode: {
        value: statusCode || 500,
        enumerable: true,
        writable: true,
      },
      extensions: {
        value: extensions ?? undefined,
        enumerable: extensions != null,
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
}

class BadGatewayError extends AlmagestCMSError {
  constructor(
    message = 'Bad Gateway',
    extensions,
  ) {
    super(
      message,
      502,
      { ...extensions, code: 'BAD_GATEWAY' },
    );
  }
}

class BadRequestError extends AlmagestCMSError {
  constructor(
    message = 'Bad Request',
    extensions,
  ) {
    super(
      message,
      400,
      { ...extensions, code: 'BAD_REQUEST' },
    );
  }
}

class ConflictError extends AlmagestCMSError {
  constructor(
    message = 'Conflict',
    extensions,
  ) {
    super(
      message,
      409,
      { ...extensions, code: 'CONFLICT' },
    );
  }
}

class InternalError extends AlmagestCMSError {
  constructor(
    message = 'Internal Server Error',
    extensions,
  ) {
    super(
      message,
      500,
      { ...extensions, code: 'INTERNAL' },
    );
  }
}

class NotFoundError extends AlmagestCMSError {
  constructor(
    message = 'Not Found',
    extensions,
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
      { ...extensions, code: 'NOT_FOUND' },
    );
  }
}

class ServiceUnavailableError extends AlmagestCMSError {
  constructor(
    message = 'Service Unavailable',
    extensions,
  ) {
    super(
      message,
      503,
      { ...extensions, code: 'SERVICE_UNAVAILABLE' },
    );
  }
}

class UnauthorizedError extends AlmagestCMSError {
  constructor(
    message = 'Unauthorized',
    extensions,
  ) {
    super(
      message,
      403,
      { ...extensions, code: 'UNAUTHORIZED' },
    );
  }
}

return {
  AlmagestCMSError,
  BadGatewayError,
  BadRequestError,
  ConflictError,
  InternalError,
  NotFoundError,
  ServiceUnavailableError,
  UnauthorizedError
}
