const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    rut: {
        type: String,
        required: [true, 'El RUT es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String 
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE','USER_ROLE ']
    },
    status: {
        type: Boolean,
        default: true
    },
    area: {
        type: String
    },
    date_last_login: {
        type: Date
    },
    date_last_password: {
        type: Date
    },

});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('user_mstr',UsuarioSchema);