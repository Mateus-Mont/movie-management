import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

export const dataSourceConfig = (): DataSourceOptions => {
  const migrationsPath: string = path.join(__dirname, "/migrations/**.{ts,js}");
  const entitiesPath: string = path.join(__dirname, "/entities/**.{ts,js}");

  const dbUrl: string | undefined = process.env.DATABASE_URL;
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL, does not exists");
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: "memory",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    url: process.env.DATABASE_URL!,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath],
    entities: [entitiesPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
