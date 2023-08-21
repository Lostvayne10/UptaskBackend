import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";

const agregarTarea = async (req,res) => {

    const {proyecto} = req.body;
    const existProyecto = await Proyecto.findById(proyecto);

    if(!existProyecto){
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({msg: error.message});
    }

    if(existProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para agregar tareas.");
        return res.status(403).json({msg: error.message});
    }

    try{
        const tareaCreada = await Tarea.create(req.body);
        res.json(
            tareaCreada
            );
    }catch(error){
        console.log(error);
    }
};
const obtenerTarea = async (req,res) => {
    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");
    if(!tarea){
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({msg: error.message});
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para ver la tarea.");
        return res.status(403).json({msg: error.message});
    }
    res.json(
        tarea
       );
};
const actualizarTarea = async (req,res) => {
    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");
    if(!tarea){
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({msg: error.message});
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para editar la tarea.");
        return res.status(403).json({msg: error.message});
    }

    try{
        tarea.nombre = req.body.nombre || tarea.nombre;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.prioridad = req.body.prioridad || tarea.prioridad;
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
        const tareaActualizada = await tarea.save();

        res.json(
            tareaActualizada
            );
    }catch(error){
        console.log(error);
    }
};
const eliminarTarea = async (req,res) => {
    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");
    if(!tarea){
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({msg: error.message});
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para editar la tarea.");
        return res.status(403).json({msg: error.message});
    }

    try{
        await tarea.deleteOne();
        res.json({msg: "Tarea Eliminada"});
    }catch(error){
        console.log(error);
    }
};
const cambiarEstado = async (req,res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
};