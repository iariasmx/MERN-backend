const Evento = require('../models/Evento');


const getEventos = async (req, res) => {
    try {

        const eventos = await Evento.find().populate('user', 'name');

        res.status(200).send({
            status: 'success',
            eventos
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error ❌, contacte con el administrador.'
        })
    }
}

const crearEvento = async (req, res) => {
    try {

        const evento = new Evento(req.body);

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            status: 'success',
            evento: eventoGuardado
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error ❌, contacte con el administrador.'
        })
    }
}

const actualizarEvento = async (req, res) => {
    try {

        const eventoId = req.params.id;
        const uid = req.uid;
        const actualiza = await Evento.findById(eventoId)

        if (!actualiza) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el evento.'
            })
        }

        if(actualiza.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento.'
            })
        }

        const nuevoEvento={
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true})

        res.status(200).send({
            status: 'success',
            evento: eventoActualizado
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error ❌, contacte con el administrador.'
        })
    }
}

const eliminarEvento = async (req, res) => {
    try {

        const eventoId = req.params.id;
        const uid = req.uid;
        const elimina = await Evento.findById(eventoId)

        if (!elimina) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el evento.'
            })
        }

        if(elimina.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para borrar este evento.'
            })
        }

        await Evento.findByIdAndDelete(eventoId)

        res.status(200).send({
            status: 'success',
            msg: 'Evento eliminado.'
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}