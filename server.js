if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//server
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
//Database
const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected')
  })
  .catch((error) => console.log(error))
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

app.listen(3000)
