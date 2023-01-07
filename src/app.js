import express,{ json } from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(json())

const sign = []

app.post("/sign-up", (req, res) => {
    const user = req.body

    const verifyUsername = sign.find(item => item.username == user.username)
    if(verifyUsername){
        return res.status(409).send("This username already exists :(")
    }

    if(!user.username || !user.avatar){
        return res.status(422).send("Please fill in all spaces :D")
    }

    sign.push(user)
    res.sendStatus(200)
})

app.get("/", (req, res) => {
    res.send("i am ok!")
})

const PORT = 5000
app.listen(PORT, () => {
    console.log("Welcome to Tweteroo server!")
})