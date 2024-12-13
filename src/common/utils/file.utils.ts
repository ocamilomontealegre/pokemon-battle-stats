import { fileURLToPath } from "node:url";
import { dirname, basename } from "node:path";
import { readCSV } from "danfojs-node";
import type { DataFrame } from "danfojs-node/dist/danfojs-base";

export class FileUtils {
  public static getCurrentDirectory(metaURL: string): string {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const __filename = fileURLToPath(metaURL);
    return dirname(__filename);
  }

  public static getFilenme(metaURL: string): string {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const __filename = fileURLToPath(metaURL);
    return basename(__filename);
  }

  public static async readCsvFile(
    filepath: string,
    columns: string[],
  ): Promise<DataFrame> {
    return readCSV(filepath, {
      frameConfig: {
        columns,
      },
    });
  }
}

