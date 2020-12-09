const express = require('express')
const router = express.Router()
const noticias = require('../controllers/noticia')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/notices/');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
})
const upload = multer({storage})

/*router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.roles.indexOf('admin') >= 0) {
            return next()
        }
        res.redirect('/')
    }
    res.redirect('/login')
})*/

router.get('/noticias', noticias.indexNoticias.bind(null, 'admin'))
router.get('/noticias/detail/:id', noticias.getNoticia)
router.get('/noticias/create', noticias.novaForm)
router.post('/noticias/create', upload.single('image'), noticias.novaProcess)
router.get('/noticias/delete/:id', noticias.excluir)
router.get('/noticias/update/:id', noticias.editarForm)
router.post('/noticias/update/:id', upload.single('image'), noticias.editarProcess)


module.exports = router