import {app} from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(()=>{
    console.log("Database connected!")
    app.listen(300,()=>{
        console.log("Server is runnig!")
    })
}).catch(err=>{
    console.log(err)
})