const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {status: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))    
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {

    const {rut, name, email, password, role} = req.body;
    const usuario = new Usuario({rut, name, email, password, role});

    //ENCRIPTAR CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt); 

    //GUARDAR EN DB
    await usuario.save();

    res.json({
        msg: 'POST',
        usuario
    });
}

const actualizarUsuario = async(req, res = response) => {
    const {id} = req.params;
    const {_id, password, email, rut, ...resto} = req.body;

    //TODO VALIDAR CONTRA DB
    if(password){
        //ENCRIPTAR CONTRASEÑA
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);  
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new: true});  

    res.json({
        msg: 'Actualizar Usuarios',
        usuario
    });
}

const eliminarUsuario = async(req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {status: false},{new: true});
    res.json({usuario});
}

module.exports = {
    actualizarUsuario,
    crearUsuario,
    eliminarUsuario,
    usuariosGet,
}