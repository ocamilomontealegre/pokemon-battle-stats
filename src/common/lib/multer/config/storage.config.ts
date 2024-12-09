import multer, { diskStorage, type Multer, type StorageEngine } from "multer";
import { FILE_DESTINATION, FILE_SIZE } from "../models/constants";
import type { Request } from "express";

const storageConfig: StorageEngine = diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    const destinationPath = FILE_DESTINATION;
    cb(null, destinationPath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const fileSufix = `${Date.now()}`;
    cb(null, `${fileSufix}_${file.originalname}`);
  },
});

export const multerConfig: Multer = multer({
  storage: storageConfig,
  limits: { fileSize: FILE_SIZE },
});

