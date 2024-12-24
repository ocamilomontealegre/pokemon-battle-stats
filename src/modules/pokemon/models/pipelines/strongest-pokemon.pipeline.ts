import type { PipelineStage } from "mongoose";

export const strongestPokemonPipeline: PipelineStage[] = [
  {
    $project: {
      _id: 1,
      name: 1,
      totalStats: {
        $sum: ["$healthPoints", "$attack", "$defense"],
      },
    },
  },
  {
    $sort: {
      totalStats: -1,
    },
  },
  {
    $limit: 1,
  },
];

