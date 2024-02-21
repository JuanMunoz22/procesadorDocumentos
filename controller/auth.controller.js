const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const {generarJWT} = require('../helpers/generar-jwt');


const loginController = async(req, res) => {
    const {email, password} = req.body;

    try {

        //Verificar si existe email
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Cotraseña incorrectos - Email'
            })
        }

        //Verificar si usuario esta activo
        if(!usuario.status){
            return res.status(400).json({
                msg: 'Usuario / Cotraseña incorrectos - Estado'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Cotraseña incorrectos - Password'
            })        
        }
        
        //Genero JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    loginController
}