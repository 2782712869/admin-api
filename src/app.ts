import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import compression from "compression"
import bodyParser from "body-parser"
import path from "path"
import { admin, client } from "./routes"

const app = express()
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use("/doc", express.static(path.join(__dirname, 'doc')))
app.use("/admin", admin())
app.use("/client", client())

mongoose.connect("mongodb://127.0.0.1:27017/cmd").then(() => {
  app.listen(3000, () => {
    console.log("服务启动成功")
  })
})
