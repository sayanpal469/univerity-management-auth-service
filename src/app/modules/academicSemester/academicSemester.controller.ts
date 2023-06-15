import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationField } from '../../../conostance/pagination';
import {
  IAcaDemicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import IPagination from '../../../interfaces/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AcademicSemesterService.createUserAcademicUser(data);
  sendResponse<IAcaDemicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const filters = pick(req.query, academicSemesterFilterablebleFields);
    const filters: IAcademicSemesterFilters = {
      searchTerm: '',
      ...pick(req.query, academicSemesterFilterableFields),
    };
    const paginationOptions: IPagination = pick(req.query, paginationField);

    const result = await AcademicSemesterService.getAllAcademicSemester(
      filters,
      paginationOptions
    );

    sendResponse<IAcaDemicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const getSingelSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingelAcademicSemester(id);

    sendResponse<IAcaDemicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully !',
      data: result,
    });
    next();
  }
);

const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      updatedData
    );

    sendResponse<IAcaDemicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully !',
      data: result,
    });
    next();
  }
);

const deleteSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteAcademicSemester(id);

    sendResponse<IAcaDemicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully !',
      data: result,
    });
    next();
  }
);

export const AcademicUserController = {
  createUser,
  getAllSemesters,
  getSingelSemester,
  updateSemester,
  deleteSemester,
};
