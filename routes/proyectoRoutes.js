import {
    obtenerProyecto,
    obtenerProyectos, 
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    eliminarColaboador,
    agregarColaboador,
    obtenerTareas
} from "../controllers/proyectoController.js";

import checkAuth from "../middleware/checkAuth.js"
import express from "express"

const router = express.Router();
router
    .route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto);


router
    .route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth,editarProyecto)
    .delete(checkAuth,eliminarProyecto);

router.get('/tareas/:id', checkAuth, obtenerTareas);
router.post('/agregar-colaborador/:id', checkAuth, agregarColaboador);
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaboador);


export default router;