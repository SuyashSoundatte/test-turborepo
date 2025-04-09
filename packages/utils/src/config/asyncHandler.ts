import { Request, Response, NextFunction, RequestHandler } from "express"

export const asyncHandler = (func:(req: Request, res: Response, next: NextFunction)=> Promise<unknown>): RequestHandler=>{
  return (req: Request, res: Response, next: NextFunction)=>{
    Promise.resolve(func(req, res, next)).catch((err)=> next(err));
  }
}
