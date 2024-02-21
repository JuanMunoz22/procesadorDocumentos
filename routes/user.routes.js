const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controller/user.controller');

const {validarCampos,
       validarJWT,
       esAdminRole,
       tieneRole 
    } = require('../middlewares');

const { esRoleValido, emailExiste, rutExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet);

router.post('/create', [
    check('rut','El RUT es obligatorio').not().isEmpty(),
    check('rut').custom(rutExiste),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo no es valido').isEmail(),
    check('email').custom(emailExiste),
    check('password','La contraseña debe tener 6 caracteres como minimo').isLength({min: 6}),
    //check('role','Rol no valido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('role').custom(esRoleValido),
    validarCampos
],crearUsuario);

router.delete('/delete/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],eliminarUsuario);

router.put('/update/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
],actualizarUsuario);


module.exports = router;