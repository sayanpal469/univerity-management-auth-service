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
route.get('/:id', AcademicUserController.getSingelSemester);
route.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicemesterZodSchema),
  AcademicUserController.updateSemester
);
route.delete('/:id', AcademicUserController.deleteSemester);
route.get('/', AcademicUserController.getAllSemesters);

export const AcademicSemesterRoute = route;
