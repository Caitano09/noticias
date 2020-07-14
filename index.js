const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const session = require('express-session')
const bodyParser = require('body-parser')

const noticias = require('./routes/noticia')
const restrito = require('./routes/restrito')
const admin = require('./routes/admin')
const auth = require('./routes/auth')
const pages = require('./routes/pages')
const Noticia = require('./models/noticia')
const User = require('./models/user')
const mongo = process.env.MONGODB || 'mongodb://localhost/noticias'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({secret: 'FullStackMaster', name: 'sessionId'}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json({extended: true}))

app.use('/', auth)
app.use('/', pages)
app.use('/restrito', restrito)
app.use('/noticias', noticias)
app.use('/admin', admin)

mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => console.log('Running on port: ' + port))
    })
    .catch(err => console.log(err))


