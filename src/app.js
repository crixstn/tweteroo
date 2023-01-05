import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/", (req, res) => {
    res.send("i am ok!")
})

const PORT = 5000
app.listen(PORT, () => {
    console.log("Welcome to Tweteroo server!")
})