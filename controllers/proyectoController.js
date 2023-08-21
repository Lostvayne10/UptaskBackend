import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const obtenerProyectos = async (req, res) => {
   const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
   res.json(proyectos);
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;
    try{
        const proyectoCreado = await proyecto.save();
        res.json(proyectoCreado)
    }catch(error){  
        console.log(error);
    }
}

const obtenerProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if(!proyecto){
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({msg: error.message});
    }
    if(req.usuario._id.toString() !== proyecto.creador.toString()){
        const error = new Error("Accion no Valida");
        return res.status(403).json({msg: error.message});
    }

    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);

    res.json({
        proyecto,
        tareas
    });
}

const editarProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if(!proyecto){
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({msg: error.message});
    }
    if(req.usuario._id.toString() !== proyecto.creador.toString()){
        const error = new Error("Accion no Valida");
        return res.status(403).json({msg: error.message});
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try{
        const proyectoActualizado = await proyecto.save();

        return res.json(proyectoActualizado);
    }catch(error){
        console.log(error);
    }
}

const eliminarProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if(!proyecto){
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({msg: error.message});
    }
    if(req.usuario._id.toString() !== proyecto.creador.toString()){
        const error = new Error("Accion no Valida");
        return res.status(403).json({msg: error.message});
    }
    try{
        await proyecto.deleteOne();
        res.json({msg: "Proyecto Eliminado"});
    }catch(error){
        console.log(error);
    }
}
const agregarColaboador = async (req, res) => {}
const eliminarColaboador = async (req, res) => {}

const obtenerTareas = async (req, res) => {
    const {id} = req.params;
    const existeProyecto = await Proyecto.findById(id);
    if(!existeProyecto){
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({msg: error.message});
    }

    if(req.usuario._id.toString() !== existeProyecto.creador.toString()){ // FALTA AGREGAR COLABORADOR
        const error = new Error("Accion no Valida");
        return res.status(403).json({msg: error.message});
    }

   

    if(!tareas){
        const error = new Error("No se encontraron tareas");
        return res.status(404).json({msg: error.message});
    }
    console.log(tareas);
    res.json(tareas);


}

export {
    obtenerProyecto,
    obtenerProyectos, 
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    eliminarColaboador,
    agregarColaboador,
    obtenerTareas
};