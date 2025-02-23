const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const {generateToken} = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
    const { email, password } = req.body;

    try{
        let usuario = await Usuario.findOne({ email }).exec();

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya se encuentra registrado.`
            })
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = await bcrypt.hash(password, 10);
        usuario.password = await bcrypt.hash(password, salt);
        await usuario.save();

        // Generar JWT
        const token = await generateToken(usuario.id, usuario.name);

        res.status(201).json(
            {
                "ok": true,
                "msg":"User saved successfully",
                "data": usuario,
                token
            }
        )
    }catch(err){
        console.log(err.errmsg);
        res.status(500).json({
            "ok": false,
            "msg": "Por favor contacte al administrador"
        });
    }
}

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email }).exec();

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario no existe.`
            })
        }

        // usuario = new Usuario(req.body);

        // Confirmar password
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: `Password incorrecto.`
            })
        }

        // Generar JWT
        const token = await generateToken(usuario.id, usuario.name);

        res.status(200).json(
            {
                "ok": true,
                uid: usuario.id,
                name: usuario.name,
                token
            }
        )

    } catch (err) {
        console.log(err.errmsg);
        res.status(500).json({
            ok: false,
            msg: "Por favor contacte al administrador"
        });
    }


}

const revalidarUsuario = async (req, res) => {

    const {uid, name} = req;

    const token = await generateToken(uid, name);
    res.json(
        {
            "ok": true,
            token
        }
    )
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarUsuario,
}