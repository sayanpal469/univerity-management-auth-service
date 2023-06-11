import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicUserController } from './academicSemester.controller';

const route = express.Router();

route.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicemesterZodSchema),
  AcademicUserController.createUser
);

export const AcademicSemesterRoute = route;
