const db = require('../models')
const Article = require('../models/article')
const User = require('../models/user')
const fs = require('fs')

// Fonction création d'un article.
exports.create = (req, res, next) => {
    const article = {
      message: req.body.message,
      userId: req.params.id,
      image: null
    }
    if (req.file) {
      article.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(article);
    db.Article.create(article)
    .then(article => {res.send(article)})
    .catch(err => {res.status(500).send({message:err.message || "Une erreur s'est produite lors de la création de l'article "})})
}

// Fonction récupération de tous les articles.
exports.findAll = (req, res, next) => {
  db.Article.findAll({
    attributes: ['id', 'userId', 'message','image', 'createdAt'], 
    include: [{
    model: db.User,
    attributes: ['username', 'email']
    }],
    order: [ [ 'createdAt', 'DESC' ]],
  })
  .then((response) => {res.status(200).json(response)});
}

// Fonction suppression de l'article.
exports.delete = (req, res, next) => {
  const id = req.params.id
  console.log(id);
  db.Article.findOne({where: { id: id }})
  .then(article => {
    if (article.image === null) {
      db.Article.destroy({
        where: { id: id }
      })
      .then(() => res.status(200).json({ message: 'Article supprimé !'}))
      .catch(error => res.status(400).json({ error: error }))
    } else {
      const filename = article.image.split('/images/')[1]
      console.log(article.image);
      fs.unlink(`images/${filename}`, () => {
        db.Article.destroy({
          where: { id: id }
        })
        .then(() => res.status(200).json({ message: 'Article supprimé !'}))
        .catch(error => res.status(400).json({ error: error }))
      })
    }
  })
  .catch(error => res.status(500).json({ error: error }))
};