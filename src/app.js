import express,{ json } from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(json())

const sign = []
const tweets = []

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

app.post("/tweets", (req, res) => {
    const tweet = req.body

    const verifyLogin = sign.find(item => item.username == tweet.username)

    if(!verifyLogin){
        return res.sendStatus(401)
    }

    if(!tweet.username || !tweet.tweet){
        return res.status(422).send("Please fill in all spaces :D")
    }

    tweets.push(tweet)
    res.sendStatus(200)
})

app.get("/tweets", (req, res) => {
    
    const tweet = []

    for(let i = 0; i < tweets.length; i++){
        const tweetData = tweets[i]

        const bodyTweet = {
            username: tweetData.username,
            tweet: tweetData.tweet,
            avatar: sign.find(item => item.username === tweetData.username).avatar
        }

        tweet.push(bodyTweet)
    }

    const numTweets = 10

    const reverse = [...tweet].reverse()

    const lastTweets = reverse.slice(0, parseInt(numTweets))

    res.send(lastTweets)
})

const PORT = 5000
app.listen(PORT, () => {
    console.log("Welcome to Tweteroo server!")
})