import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
} from "inversify-express-utils";
import { MulterMiddleware } from "@common/lib/multer/multer.middleware";
import { UploadService } from "../services/upload.service";
import { UPLOAD_ENDPOINT } from "../models/constants/upload-endpoint.constant";

@controller(`/${UPLOAD_ENDPOINT}`)
export class UploadController extends BaseHttpController {
  public constructor(
    @inject(UploadService) private readonly uploadService: UploadService,
  ) {
    super();
  }

  @httpPost("/", MulterMiddleware)
  public async upload(@request() req: Request): Promise<void> {
    const { file } = req;
    // return this.uploadService.process();
  }
}

