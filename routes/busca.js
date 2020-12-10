const express = require('express')
const router = express.Router()
const noticias = require('../controllers/noticia')

router.get('/noticias', noticias.buscar)


module.exports = router