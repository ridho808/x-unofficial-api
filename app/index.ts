import express from "express"
import router from "./router"

declare global {
    var AccountTwitter: any
}

global.AccountTwitter = {}

const app = express()
const port = 3000


app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})