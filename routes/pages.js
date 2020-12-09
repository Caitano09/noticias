const express = require('express')
const router = express.Router()
const noticias = require('../controllers/noticia')

router.get('/', noticias.index)
router.get('/noticias/:id', noticias.getNoticia)

module.exports = router