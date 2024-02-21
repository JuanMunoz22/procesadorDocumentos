
const esAdminRole = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'No se puede verificar rol sin un token'
        });
    };

    const {role, name} = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no autorizado para esta operación`
        });
    };

    next();
}

const tieneRole = (...roles) => {
    return (req, res, next) => {
        
        if(!req.usuario){
            return res.status(500).json({
                msg: 'No se puede verificar rol sin un token'
            });
        };
        
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `${req.usuario.name} no autorizado para esta operación`
            });
        };
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}