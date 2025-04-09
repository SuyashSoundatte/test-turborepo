export class ApiResponse<T>{
  message: string;
  statuscode: number;
  data: T | null;

  constructor(statuscode: number, data: T | null, message: string = ''){
    this.statuscode = statuscode,
    this.data = data,
    this.message = message;
  }
}