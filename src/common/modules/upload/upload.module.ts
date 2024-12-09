import { ContainerModule, type interfaces } from "inversify";
import { UploadController } from "./controllers/upload.controller";
import { UploadService } from "./services/upload.service";
import { MulterMiddleware } from "@common/lib/multer/multer.middleware";

export const UploadModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UploadController>(UploadController).toSelf().inSingletonScope();
  bind<UploadService>(UploadService).toSelf().inSingletonScope();
  bind<MulterMiddleware>(MulterMiddleware).toSelf().inSingletonScope();
});

