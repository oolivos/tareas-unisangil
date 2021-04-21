const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario")

const login = async (req, resp) => {
    const {email, password} = req.body
    const user = await Usuario.findOne({email: email})
    if(user){
        const valido = await bcryptjs.compareSync(password, user.password)
        if(valido){
            jwt.sign({uid: user._id, email: user.email}, 'huyeskhdf8753', (error, token) => {
                if(token){
                   return resp.status(200).json({
                       user: user,
                       token: token
                   }) 
                }
                if(error) {
                    resp.status(500).send(error)
                }
            })
   
        }else{
            return resp.status(401).send('Credenciales incorrectas!!')
        }
    }else{
        return resp.status(401).send('Credenciales incorrectas!!')
    }
}

const logout = () => {

}

module.exports = {
    login,
    logout
}