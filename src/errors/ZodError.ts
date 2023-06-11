import { GenericResponce } from '../interfaces/common';
import { ZodError, ZodIssue } from 'zod';
import { GenericErrorMessage } from '../interfaces/error';

const handelZodError = (err: ZodError): GenericResponce => {
  const errors: GenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Error',
    errorMessage: errors,
  };
};

export default handelZodError;
