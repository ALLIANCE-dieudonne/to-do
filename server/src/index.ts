import { config } from "dotenv";
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routes"
import "reflect-metadata";
import swaggerFile from "./swagger/doc/swagger.json"
import swaggerUi from "swagger-ui-express"
import corsOptions from "./utils/cors";

config()


const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.disable('x-powered-by');

app.get("/", ()=>{
    console.log("Hello world")
})


app.use("/api/v1", router)
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app;