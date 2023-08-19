import mongoose from "mongoose";

const conectarDB = async () => {
    try{

        const connection = await mongoose.connect(process.env.DB_CONNECTION);

        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log(`conexion a la DB exitosa en: ${url}`)

    }catch(error){
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;