/*
    CRUD
    host + /api/events
 */

const express = require('express');
const router = express.Router();

const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require("../controllers/events");
const {revalidarUsuario} = require("../controllers/auth");
const {validarJwt} = require("../middlewares/validar-jwt");
const { check } = require('express-validator');
const {validarCampos} = require("../middlewares/validar-campos");
const {isDate} = require("../helpers/isDate");

// Todas las rutas pasan por la validación del JWT
router.use(validarJwt);

// Obtener Eventos
router.get('/', getEventos);
// Crear Eventos
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('start', 'Fecha de finalización obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);
// Actualizar Evento
router.put('/:id', actualizarEvento);
// Borrar Evento
router.delete('/:id', eliminarEvento);


module.exports = router;