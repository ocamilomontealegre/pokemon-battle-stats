import { inject } from "inversify";
import { controller, httpPost, queryParam, request } from "inversify-express-utils";
import { HTTPException } from "@common/exceptions";
import { MulterMiddleware } from "@common/lib/multer/multer.middleware";
import { UploadService } from "../services/upload.service";
import { UPLOAD_ENDPOINT } from "../models/constants/upload-endpoint.constant";
import { SupportedUploadServices } from "../models/enums/supported-upload-services.enum";
import type { Request } from "express";
import type { GenericObject } from "@common/types";

@controller(`/${UPLOAD_ENDPOINT}`)
export class UploadController {
  public constructor(
    @inject(UploadService) private readonly uploadService: UploadService,
  ) {}

  @httpPost("/", MulterMiddleware)
  public async uploadCsv(
    @request() req: Request,
    @queryParam("service") service: SupportedUploadServices,
  ): Promise<GenericObject> {
    const { file } = req;
    if (!file) throw new HTTPException(500, "File not uploaded");

    await this.uploadService.processCsv(file.path, service);
    return { upload: "success" };
  }
}

