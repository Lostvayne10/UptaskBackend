import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegister, emailOlvidePassword } from "../helpers/email.js";

const registrar = async (req, res) => {
    try{
        const {correo} = req.body;
        const existeUsuario = await Usuario.findOne({ correo: correo});
        if(existeUsuario){
            const error = new Error("Usuario ya registrado");
            
            return res.status(400).json({msg: error.message});
        }
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();

        emailRegister({
            email: usuario.correo,
            nombre: usuario.nombre,
            token: usuario.token
        });

        res.json({
            msg: "Usuario Creado correctamente, Revisa tu email para confirmar tu cuenta"
        });
    }catch(error){
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const {correo, password} = req.body;
    const usuario = await Usuario.findOne({ correo: correo});
    if(!usuario){
        const error = new Error("El correo no existe");
        return res.status(404).json({msg: error.message});
    }
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");       
        return res.status(403).json({msg: error.message});
    }
    if(!await usuario.comprobarPassword(password)){
        const error = new Error("La contraseña no es valida");
        return res.status(403).json({msg: error.message});
    }
    res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        token: generarJWT(usuario._id)
    });
}

const confirmar = async (req, res) =>{
    if(!req.params.token){
        const error = new Error("El token no fue encontrado");
        return res.status(403).json({msg: error.message});
    }
    const usuarioConfirmar = await Usuario.findOne({token: req.params.token});
    if(!usuarioConfirmar){
        const error = new Error("El token no coincide con ningun usuario");
        return res.status(403).json({msg: error.message});
    }
    try{
        usuarioConfirmar.confirmado =  true;
        usuarioConfirmar.token =  '';
        await usuarioConfirmar.save();
        return res.status(200).json({msg: "Usuario confirmado"});
    }catch(error){
        console.log(error);
    }
}

const olvidePassword = async (req, res) => {
    const {correo} = req.body;
    const usuario = await Usuario.findOne({ correo: correo});
    if(!usuario){
        const error = new Error("El correo no existe");
        res.status(404).json({msg: error.message});
    }
    try{
        usuario.token = generarId();
        await usuario.save();

        emailOlvidePassword({
            email: usuario.correo,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({
            msg: "Hemos enviado un email con las instrucciones",
        })
    }catch(error){
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const {token} = req.params;
    if(!req.params.token){
        const error = new Error("El token no fue encontrado");
        return res.status(403).json({msg: error.message});
    }
    const tokenValido = await Usuario.findOne({token: token});
    if(!tokenValido){
        const error = new Error("El token no es valido");
        return res.status(403).json({msg: error.message});
    }
    res.json({
        msg: "Token valido y el usuario existe"
    });
}

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    if(!req.params.token){
        const error = new Error("El token no fue encontrado");
        return res.status(403).json({msg: error.message});
    }
    const usuario = await Usuario.findOne({token: token});
    if(!usuario){
        const error = new Error("El token no es valido");
        return res.status(403).json({msg: error.message});
    }
    if(!password){
        const error = new Error("Ingrese una nueva contraseña");
        return res.status(403).json({msg: error.message});
    }
    usuario.password = password;
    usuario.token = '';
    usuario.save();
    res.json({
        msg: "Contraseña cambiada correctamente!!"
    });
}

const profile = async (req,res) => {
    const id = req.usuario._id;

    try{
        const usuario = await Usuario.findById(id);
        console
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
        });
    }catch(error){
        console.log(error);
    }

}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    profile
};