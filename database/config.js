const mongoose = require('mongoose');   

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            //useNewUrlParser: true,
            //useUnifiedTopology:true,
           /* useCreateIndex: true,
            useFindAndModify : false,*/
        });

        console.log('Conexion a DB exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con base de datos');
    }
}

module.exports = {
    dbConnection
}