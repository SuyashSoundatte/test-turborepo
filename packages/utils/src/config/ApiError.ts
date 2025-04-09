import { ZodIssue } from "zod";

export class ApiError extends Error {
  statuscode: number;
  error: string | string[] | ZodIssue[];
  stack?: string;
  success: boolean;
  status: string;
  data: any;

  constructor(
    statuscode: number,
    message: string = 'Something went wrong',
    error: string | string[] | ZodIssue[] = 'Unknown error',
    data: any = null,
  ) {
    super(message);
    this.statuscode = statuscode;
    this.success = false;
    this.status = statuscode >= 400 && statuscode < 500 ? 'fail' : 'error';
    this.error = error;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statuscode,
      message: this.message,
      error: this.error,
      status: this.status,
      data: this.data,
      stack: this.stack,
    };
  }
}