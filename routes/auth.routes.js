const {Router} = require('express');
const { check } = require('express-validator');

const { loginController } = require('../controller/auth.controller');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],loginController);


module.exports = router;
