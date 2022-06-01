// ajout de bcryp pour hasher le mot de passe
const bcrypt = require('bcrypt');
const db = require('../models');
// importation du schema User
const User = require('../models/user')
const jwt = require("jsonwebtoken");


// Fonction qui permet de s'inscrire.
exports.signup = (req, res) => {
  data = req.body
  bcrypt.hash(data.password, 8)
  .then(hash => {
    const user = db.User.create({
      username: data.username,
      email: data.email,
      password: hash
    })
    .then(newUser => {console.log("Utilisateur enregistré:", newUser.username, newUser.email, newUser.password)
      res.status(201).json()        
    })
    .catch(error => res.status(400).json(error))
  })    
  .catch(error => res.status(500).json(error))
}

// Fonction qui permet de se connecter.
exports.login = (req, res) => {
  db.User.findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      if (!user) {
        console.log("Utilisateur introuvable !")
        return res.status(401).json({ error: "Utilisateur non trouvé !" })
      }
      bcrypt.compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {console.log("Mot de passe incorrect !")
          return res.status(401).json({ error: "Mot de passe incorrect !" })
        }
        console.log("Vous êtes connecté !");
        res.status(200).json({
          user: user,
          userId: user.id,
          token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        })
      })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// Fonction qui permet de récupérer les données de l'utilisateur.
exports.getUser = (req, res) => {
  try {
    db.User.findOne({
      attributes: ['id', 'isAdmin', 'username' ],
      where: { id: req.params.id },
    })
    .then((user) => {
      res.status(200).json(user.dataValues)
    })
    .catch((error)=>{
      res.status(404).json(error.message)
    })
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Fonction qui permet de modifier le nom d'utilisateur.
exports.modifyUsername = (req, res, next) => {
  const username = req.body.username
  const id = req.params.id
  db.User.update({ username:username }, { where: { id: req.params.id }})
    .then((user) => {
      console.log(username)
      res.status(200).json({ username, message: "Nom d'utilisateur modifié" })
    })
    .catch(error => res.status(400).json({ error }))
}

// Fonction qui permet de supprimer l'utilisateur.
exports.modifyEmail = (req, res, next) => {
  const email = req.body.email;
  console.log('in');
  if (req.body.email) { 
    db.User.update({ email, email:  email}, { where: { id: req.params.id }})
    .then(user => {res.status(201).json({message: "Email mis à jour"});})
    .catch(error => res.status(400).json(error));
  }
};

// Fonction qui permet de modifier le mot de passe.
exports.modifyPassword = (req, res, next) => {
  const password = req.body.password;
  console.log('ine');
  if (req.body.password) {
    bcrypt.hash(req.body.password, 8)
      .then(hash => {
        req.body.password = hash;
        console.log(hash);
        db.User.update({password, password: password}, {where: {id: req.params.id}})
        .then(user => {res.status(201).json({message: "Mot de passe changé"});})
        .catch(error => res.status(400).json(error));
      }
    )
  }
};

// Fonction qui permet de supprimer l'utilisateur.
exports.deleteUser = (req, res, next) => {
  let userId = req.params.id
  if (userId != null) {
    db.User.findOne({where: { id: userId }})
      .then(user => {
      if (user != null)
      // suppression des articles.
      {db.Article.destroy({where: { userId: user.id }})
      .then(() => {console.log('Tous les articles de cet user ont été supprimé');
      //Suppression de l'utilisateur
      db.User.destroy({where: { id: user.id }})
      .then(() => res.end())
      .catch(err => console.log(err))})
      .catch(err => res.status(500).json(err))}
      else {res.status(401).json({ error: 'Cet user n\'existe pas' })}
    })
  } else {
      res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
  }
}