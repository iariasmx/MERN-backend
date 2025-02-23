/*
    Rutas de autenticación
    host + /api/auth
 */

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarUsuario } = require('../controllers/auth');
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJwt} = require("../middlewares/validar-jwt");

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password deber ser de al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] ,
    loginUsuario
);

router.post(
    '/new',
    [
        check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password deber ser de al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] ,
    crearUsuario
);

router.get('/renew', validarJwt, revalidarUsuario);

module.exports = router;



