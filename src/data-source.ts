import "dotenv/config"
import "reflect-metadata"
import { DataSource,DataSourceOptions } from "typeorm"

export const dataSourceConfig=():DataSourceOptions=>{
    return {
        type:"postgres",
        url:process.env.DATABASE_URL!,
        synchronize:false,
        logging:true,
        migrations:["src/migrations/*.ts"],
        entities:["src/entities/*.ts"]
    }
}

export const AppDataSource = new DataSource(dataSourceConfig())