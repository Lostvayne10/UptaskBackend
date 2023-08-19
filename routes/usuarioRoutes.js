import express from "express";
import {    
            registrar, 
            autenticar, 
            confirmar, 
            olvidePassword, 
            comprobarToken, 
            nuevoPassword
        } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

router.get('/profile', checkAuth, (req, res) => {
    res.send({
        msg: "Desde perfil"
    });
})


export default router;