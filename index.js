import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import routerUsuarios from "./routes/usuarioRoutes.js";
import routerProyectos from "./routes/proyectoRoutes.js";
import routerTareas from "./routes/tareaRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();
// ROUTING
app.use("/api/usuarios", routerUsuarios);
app.use("/api/proyectos", routerProyectos);
app.use("/api/tareas", routerTareas);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});