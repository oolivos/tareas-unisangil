const {Schema, model} = require('mongoose')

const tareaSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

module.exports = model('Tarea', tareaSchema)