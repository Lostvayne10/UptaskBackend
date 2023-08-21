import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    fechaEntrega:{
        type: Date,
        required: true,
        default: Date.now()
    },
    estado:{
        type: Boolean,
        default: false
    },
    prioridad:{
        type: String,
        required: true,
        enum: ['Baja','Media','Alta']
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto"
    },
}, {
    timestamps: true,
});
const Tarea = mongoose.model("Tarea", tareaSchema);
export default Tarea;