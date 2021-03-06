const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./src/routes')

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST_NAME, PORT } = require('./src/env')

const app = express()

app.use(cors())

// Connection with MongoDB Atlas
mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST_NAME}.mongodb.net/test?retryWrites=true&w=majority`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// app configuration
app.use(express.json())
app.use(routes)

app.listen(PORT)
