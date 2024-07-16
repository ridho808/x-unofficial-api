import express from "express"
import router from "./router"
// import { schedule } from "node-cron"
import fs from "fs/promises"

declare global {
    var AccountTwitter: any
}
global.AccountTwitter = {}

const app = express()
const port = 3535


app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


