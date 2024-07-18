import express from "express"
import router from "./router"
import fileupload from "express-fileupload"
import { schedule } from "node-cron"
import fs from "fs/promises"

declare global {
    var AccountTwitter: any
}
global.AccountTwitter = {}

const app = express()
const port = 3535
app.use(fileupload())
app.use(express.json())
app.use(router)
app.use("*", (req, res, next) => {
    return res.status(404).json({ message: "Route Not Found 404" })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

schedule("0 0 */3 * *", () => {
    fs.rm("./app/store", { recursive: true, force: true })
    fs.mkdir("./app/store")
})

