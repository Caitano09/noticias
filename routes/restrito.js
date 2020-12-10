const express = require('express')
const router = express.Router()
const noticias = require('../controllers/noticia')

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.roles.indexOf('restrito') >= 0) {
            return next()
        }
        res.redirect('/')
    }
    res.redirect('/login')
})

router.get('/', (req, res) => res.send('restrito'))

router.get('/noticias', noticias.indexNoticias.bind(null, 'private'))
router.get('/noticias/detail/:id', noticias.getNoticia)

module.exports = router