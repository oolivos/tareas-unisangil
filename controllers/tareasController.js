const Tarea = require("../models/Tarea")

const createTarea = (req, resp) => {
    const nuevaTarea = req.body
    const tarea = new Tarea(nuevaTarea)
    tarea.save().then(usuario => {
        resp.status(201).json(tarea)
    }).catch(error => {
        resp.status(500).send(error)
    })
}

const getAllTareas = async ( req = request  , resp = response ) => {
    try {
        return resp.json(await Tarea.find().populate('usuario'))  
    } catch (error) {
        resp.status(500).send(error)
    }
}

const updateTarea = async ( req = request  , resp = response ) => {
    try {
        const id = req.params.id
        const tarea = req.body
        const tareaActualizada =  await Tarea.findOneAndUpdate({_id: id}, tarea)
        resp.json(tareaActualizada)
    } catch (error) {
        resp.status(500).send(error)
    }  
}
const deleteTarea = async ( req = request  , resp = response ) => {
    try {
        const id = req.params.id
        await Tarea.deleteOne({_id: id})
        resp.send('ok')
    } catch (error) {
        resp.status(500).send(error)
    }
}

const showTarea = async ( req = request  , resp = response ) => {
    try {
       const id = req.params.id
        const tarea = await  Tarea.findById(id).populate('usuario')
        resp.json(tarea) 
    } catch (error) {
        resp.status(500).send(error)
    }
    
}

module.exports = {
    createTarea,
    getAllTareas,
    updateTarea,
    deleteTarea,
    showTarea
}