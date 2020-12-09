const moongose = require('mongoose')
const { text } = require('express')

const NoticiaSchema = moongose.Schema({
    title: String,
    content: String, 
    category: String,
    image: String
})

const Noticia = moongose.model('Noticia', NoticiaSchema)

module.exports = Noticia