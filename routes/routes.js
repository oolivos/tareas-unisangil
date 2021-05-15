const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const { createUsuario, updateUsuario, deleteUsuario, getAllUsuarios, showUsuario } = require('../controllers/usuariosController')
const {createTarea, updateTarea, deleteTarea, getAllTareas, showTarea} = require('../controllers/tareasController')

const usuarioAutenticado = (req = express.request , resp = express.response, next) => {
    //onsole.log(req.headers)
    if(req.headers && req.headers.authorization){
        //console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        //console.log(token)
        try {
            const verify = jwt.verify(token, process.env.JWT_SALT)
            if(!verify){
                return resp.status(401).send('Token Invalido')
            }
            //console.log(verify)
            req.auth = verify
        } catch (error) {
            //console.log(error)
            return resp.status(401).send(error)
        }
        
        //const verificado = jwt.verify()
    }else{
        return resp.status(401).send('No hay token')
    }
    next()
}

router.get('/usuario',usuarioAutenticado, getAllUsuarios)
router.post('/usuario/create', createUsuario)
router.delete('/usuario/delete/:id', deleteUsuario)
router.get('/usuario/show/:id', showUsuario)
router.put('/usuario/update/:id', updateUsuario)


router.get('/tareas', usuarioAutenticado, getAllTareas)
router.post('/tareas/create', createTarea)
router.delete('/tareas/delete/:id', deleteTarea)
router.get('/tareas/show/:id', showTarea)
router.put('/tareas/update/:id', updateTarea)



module.exports = router