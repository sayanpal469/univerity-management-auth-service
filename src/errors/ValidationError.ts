import mongoose from 'mongoose';
import { GenericErrorMessage } from '../interfaces/error';
import { GenericResponce } from '../interfaces/common';

const handelValidationError = (
  err: mongoose.Error.ValidationError
): GenericResponce => {
  const errors: GenericErrorMessage[] = Object.values(err.errors).map(
    element => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handelValidationError;
