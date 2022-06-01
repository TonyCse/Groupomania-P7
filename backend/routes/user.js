// ajout d'express
const express = require('express');
// appel du routeur
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require("../middlewares/auth");

// assigniation des middlewares & controllers aux routes
router.post("/signup", userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/:id", auth, userCtrl.getUser);
router.put("/update:id", auth, userCtrl.modifyUsername);
router.put("/securemail:id", auth, userCtrl.modifyEmail);
router.put("/securepassword:id", auth, userCtrl.modifyPassword);
router.delete('/:id', auth, userCtrl.deleteUser);

// exportation de la route
module.exports = router;