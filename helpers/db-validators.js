const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol) {
        throw new Error(`El rol ${role} no es valido`);
    };
};

const emailExiste = async(email) => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`Email ${email} ya existe`); 
    }
}

const rutExiste = async(rut) => {
    const existeRut = await Usuario.findOne({rut});
    if(existeRut){
        throw new Error(`RUT ${rut} ya existe`); 
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`ID ${id} no existe`); 
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    rutExiste
}