import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { HTTPException } from "@common/exceptions";
import { multerConfig } from "./config/storage.config";
import type { NextFunction, Request, Response } from "express";
import type { Multer } from "multer";

@injectable()
export class MulterMiddleware extends BaseMiddleware {
  private readonly upload: Multer;

  public constructor() {
    super();
    this.upload = multerConfig;
  }

  public handler(req: Request, res: Response, next: NextFunction): void {
    this.upload.single("file")(req, res, (error) => {
      if (error) {
        return new HTTPException(500, "Error uploading file");
      }
      next();
    });
  }
}

