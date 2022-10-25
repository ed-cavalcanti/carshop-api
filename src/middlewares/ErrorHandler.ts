import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { message, httpStatus } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Interna error' });
};

export default errorHandler;
