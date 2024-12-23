import { z } from "zod";

const EnvSchema = z.object({
  MONGO_HOST: z.string().min(8, "MONGO_HOST cannot be empty").default("localhost"),
  MONGO_PORT: z.coerce.number().min(0, "MONGO_PORT cannot be empty").default(27017),
  MONGO_USERNAME: z.string().min(3, "MONGO_USERNAME cannot be empty").default("root"),
  MONGO_PASSWORD: z
    .string()
    .min(4, "MONGO_PASSWORD cannot be empty")
    .default("example"),
  MONGO_DATABASE: z.string().min(2, "MONGO_DATABASE cannot be empty").default("db"),
});

interface MongoEnvironment {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly url: string;
}

const parsedEnv = EnvSchema.parse(process.env);
const { MONGO_DATABASE, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME } =
  parsedEnv;

export const mongoConfig: MongoEnvironment = {
  host: MONGO_HOST,
  port: MONGO_PORT,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  database: MONGO_DATABASE,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`,
};

