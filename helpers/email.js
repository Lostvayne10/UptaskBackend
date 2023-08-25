import nodemailer from "nodemailer";

export const emailRegister = async (datos) => {
    const {email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Administrado de proyectos" <cuentas@uptask.com>',
        to:email,
        subject: "Uptask - Confirma tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre}, te haz registrado correctamente, comprubea tu cuenta en UpTask.</p>
        <p>Tu cuent ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Da Click Aqui!!!</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
};

export const emailOlvidePassword = async (datos) => {
    const {email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Administrado de proyectos" <cuentas@uptask.com>',
        to:email,
        subject: "Uptask - Restablece tu contraseña",
        text: "Restablece tu contraseña",
        html: `<p>Hola: ${nombre}, haz solicitado restablecer tu contraseña de tu cuenta en UpTask.</p>
        <p>Tu cuenta ya esta casi lista, solo debes seguir en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Da Click Aqui!!!</a>
        <p>Si tu no solicitaste reestablecerla, puedes ignorar el mensaje</p>
        `
    });
};