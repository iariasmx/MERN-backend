const jwt = require('jsonwebtoken')

const validarJwt = (req, res, next) => {
    // Recibir de los headers el valor de x-token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición.',
        })
    }


    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        if (!payload) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido.'
            })
        }
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        })
    }

    next();
}
module.exports = {validarJwt}