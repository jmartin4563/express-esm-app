import express from 'express'
import bodyParser from 'body-parser'

async function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(function sleepTimeout () {
      resolve()
    }, ms)
  })
}

const router = express.Router()

function newUserMiddleware (req, res, next) {
  return sleep(500).then(() => {
    next()
  })
}

function createNewUser (req, res) {
  return sleep(1000).then(() => {
    res.status(200).json({ message: 'User created' })
  })
}

router.post('/users', newUserMiddleware, createNewUser)

const app = express()
app.use(bodyParser.json())
app.use('/api', router)

app.listen(3000, () => { console.log('Server listening on port 3000') })
