import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

export const dataSourceConfig = (): DataSourceOptions => {
  const migrationsPath: string = path.join(__dirname, "/migrations/**.{ts,js}");
  const entitiesPath: string = path.join(__dirname, "/entities/**.{ts,js}");

  const dbUrl: string | undefined = process.env.DATABASE_URL;
  const nodeEnv: string | undefined = process.env.NODE_ENV;



  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }
  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL, does not exists");
  }
  return {
    type: "postgres",
    url: dbUrl!,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath],
    entities: [entitiesPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());

