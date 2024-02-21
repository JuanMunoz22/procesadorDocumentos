const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req, res, next) => {
    
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //Leer usuario que corresponde a uid
        const usuario = await Usuario.findById(uid); 

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no valido'
            }) 
        }

        //Verificar estado de usuario
        if(!usuario.status){
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            }) 
        }

        req.usuario = usuario;
        next();    
    } catch (error) {
        console.log(token);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
}

module.exports = {
    validarJWT
}