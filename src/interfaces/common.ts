import { GenericErrorMessage } from "./error";

export type GenericResponce = {
    statusCode: number;
    message: string;
    errorMessage: GenericErrorMessage[]
}