const {response} = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'GET API - controllador'
    });
}

module.exports = {
    usuariosGet
}