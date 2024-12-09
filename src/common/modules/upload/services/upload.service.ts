import { inject, injectable } from "inversify";
import { EventEmitter } from "eventemitter3";

@injectable()
export class UploadService {
  public constructor(
    @inject(EventEmitter) private readonly eventEmitter: EventEmitter,
  ) {}

  public async processCsv(filePath: string, service: string): Promise<void> {
    this.eventEmitter.emit(service, filePath);
  }
}

