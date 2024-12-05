import type { GenericObject } from "@common/types";

export class TrainerUtils {
  public static getTrainerProjection(): GenericObject {
    return {
      name: 1,
      age: 1,
      region: 1,
    };
  }
}

