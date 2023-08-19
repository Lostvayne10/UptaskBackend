import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import routerUsuarios from "./routes/usuarioRoutes.js";


const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// ROUTING
app.use("/api/usuarios", routerUsuarios);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});