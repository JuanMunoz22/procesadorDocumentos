const {Router} = require('express');
const { usuariosGet } = require('../controller/user.controller');

const router = Router();

router.get('/', usuariosGet);




module.exports = router;