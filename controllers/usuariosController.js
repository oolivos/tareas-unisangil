const bcrypt = require('bcryptjs')
const Usuario = require("../models/Usuario")

const createUsuario = async (req, resp) => {
    const nuevoUsuario = req.body

    // construir hash
    const salt = await bcrypt.genSaltSync(11)
    const hash = await bcrypt.hashSync(nuevoUsuario.password, salt)
    nuevoUsuario.password = hash
    
    const usuario = new Usuario(nuevoUsuario)
    usuario.save().then(usuario => {
        resp.status(201).json(usuario)
    }).catch(error => {
        resp.status(500).send(error)
    })
}

const getAllUsuarios = async ( req, resp ) => {
    try {
        return resp.json(await Usuario.find())  
    } catch (error) {
        resp.status(500).send(error)
    }
      
}

const updateUsuario = async ( req, resp) => {
    try {
        const id = req.params.id
        const usuario = req.body
        if(usuario.password){
            const salt = await bcrypt.genSaltSync(11)
            const hash = await bcrypt.hashSync(usuario.password, salt)
            usuario.password = hash
        }
        const usuarioActualizado =  await Usuario.findOneAndUpdate({_id: id}, usuario)
        resp.json(usuarioActualizado)
    } catch (error) {
        resp.status(500).send(error)
    }
    
   
}
const deleteUsuario = async ( req, resp) => {
    try {
        const id = req.params.id
        await Usuario.deleteOne({_id: id})
        resp.send('ok')
    } catch (error) {
        resp.status(500).send(error)
    }
    
   
}

const showUsuario = async ( req = request  , resp = response ) => {
    try {
       const id = req.params.id
        const usuario = await Usuario.findById(id)
        resp.json(usuario) 
    } catch (error) {
        resp.status(500).send(error)
    }
    
}

module.exports = {
    createUsuario,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario,
    showUsuario
}