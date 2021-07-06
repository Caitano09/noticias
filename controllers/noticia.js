const Noticia = require('../models/noticia')
const fs = require('fs')

const index = async (req, res) => {
    const noticias = await Noticia.find({ category: 'public' })
    res.render('index', { noticias })
}

const indexNoticias = async (categoryNotice, req, res) => {
    let noticias
    if (categoryNotice == 'admin') {
        noticias = await Noticia.find({})
        res.render('noticias/indexAdmin', { noticias, categoryNotice })
    } else {
        noticias = await Noticia.find({ category: categoryNotice })
        res.render('noticias/index', { noticias, categoryNotice })
    }
}

const getNoticia = async (req, res) => {
    const noticia = await Noticia.findOne({ _id: req.params.id })
    res.render('noticias/noticia-detalhes', { noticia })
}

const novaForm = (req, res) => {
    res.render('noticias/nova')
}

const novaProcess = async (req, res) => {
    const noticia = new Noticia({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.file.filename
    })
    await noticia.save()
    res.redirect('/admin/noticias')
}

const excluir = async (req, res) => {
    const noticia = await Noticia.findOne({ _id: req.params.id })
    const path = './public/images/notices/' + noticia.image
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })

    await Noticia.remove({ _id: req.params.id })
    res.redirect('/admin/noticias')
}

const editarForm = async (req, res) => {
    const noticia = await Noticia.findOne({ _id: req.params.id })
    res.render('noticias/editar', { noticia })
}

const editarProcess = async (req, res) => {
    const noticia = await Noticia.findOne({ _id: req.params.id })

    if (req.file) {
        const path = './public/images/notices/' + noticia.image
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        noticia.image = req.file.filename
    }

    noticia.title = req.body.title
    noticia.content = req.body.content.replace(/(?:\r\n|\r|\n)/g, '<br>');//Salvar quebra de linha
    noticia.category = req.body.category
    console.log(noticia.content)
    await noticia.save()
    res.redirect('/admin/noticias')
}

const buscar = async (req, res) =>{
    const noticias = await Noticia.find({ title: req.query.title })

    if(req.query.role == 'admin'){
        res.render('noticias/buscaAdmin', {noticias})
    }else{
        res.render('noticias/busca', {noticias})
    }

}

module.exports = {
    index,
    indexNoticias,
    getNoticia,
    novaForm,
    novaProcess,
    excluir,
    editarForm,
    editarProcess,
    buscar
}