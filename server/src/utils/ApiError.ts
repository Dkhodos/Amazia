import { Response } from "express";

export default class ApiError {
    message: string;
    res: Response;
    statusCode: number;

    constructor(message: string, statusCode: number, res: Response) {
      this.statusCode = statusCode;
      this.message = message;
      this.res = res;
    }
  
    private static missingParams(params: string[], res: Response, statusCode?: number) {
      const message = params.reduce((msg, param, index) => {
        return index === params.length - 1 ? msg + param : msg + param + ", ";
      },"Missing Params: ");

      return ApiError.badRequest(message, res);
    }

    static badRequest(msg: string, res: Response, statusCode?: number) {
      return new ApiError(msg, statusCode ?? 400, res);
    }

    static raiseOnMissingParams<T>(params: string[], obj: Record<string, T>, res: Response){
      const missing = params.reduce((acc, current) => {
        if(!(current in obj)){
          acc.push(current);
        }

        return acc;
      },[] as string[])

      if(missing.length > 0){
        ApiError.missingParams(missing, res).resolve();

        return true;
      }

      return false;
    }
  
    static internal(msg: string, res: Response, statusCode?: number) {
      return new ApiError(msg, statusCode ?? 500, res);
    }

    toJson(){
      return {
        error: true,
        message: this.message
      };
    }

    resolve(){
      this.res.status(this.statusCode).json(this.toJson());
    }
  }