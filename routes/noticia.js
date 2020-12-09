const express = require('express')
const router = express.Router()
const noticias = require('../controllers/noticia')

router.get('/', noticias.indexNoticias.bind(null, 'public') )
router.get('/noticias/:id', noticias.getNoticia)

/*const createNotice = async () => {

    const noticia = new Noticia({
        title: 'Notícia Pública ' + new Date().getTime(),
        content: 'content',
        category: 'public'
    })
    await noticia.save()

    const noticia2 = new Noticia({
        title: 'Notícia Privada ' + new Date().getTime(),
        content: 'content',
        category: 'private'
    })
    await noticia2.save()
    console.log('Notice created')
}*/

//createNotice()

module.exports = router