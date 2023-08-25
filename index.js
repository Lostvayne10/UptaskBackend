import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import routerUsuarios from "./routes/usuarioRoutes.js";
import routerProyectos from "./routes/proyectoRoutes.js";
import routerTareas from "./routes/tareaRoutes.js";
import cors from "cors"
const app = express();
app.use(express.json());
dotenv.config();
conectarDB();
// CORS
const whitelist = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Error de cors"));
        }
    }
} ;

app.use(cors(corsOptions));
// ROUTING
app.use("/api/usuarios", routerUsuarios);
app.use("/api/proyectos", routerProyectos);
app.use("/api/tareas", routerTareas);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});