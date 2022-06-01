// ajout d'express
const express = require('express');
// appel du routeur
const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');

// assigniation des middlewares & controllers aux routes
router.post("/create:id", auth, multer, articleCtrl.create);
router.get("/:id", auth, multer, articleCtrl.findAll);
router.delete("/:id", auth, multer, articleCtrl.delete)

// exportation de la route
module.exports = router;