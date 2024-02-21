const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJwt');
const validaRoles = require('../middlewares/validarRoles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
}

