import { Schema, Document, model } from "mongoose";
import { UsuarioSchema } from "src/usuario/Schema/usuario.schema"; // Asegúrate de importar correctamente el modelo y el esquema de Usuario
import { Usuario } from "src/usuario/interfaces/usuario.interface";

export const AutenticacionSchema = new Schema({
  rut: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true, bcrypt: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

AutenticacionSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    // Accede al ID del usuario asociado a la autenticación
    const usuarioId = this.usuario;

    // Utiliza el modelo directamente desde el inyector de dependencias de NestJS
    const usuarioModel = model<Usuario>("Usuario", UsuarioSchema);

    // Elimina el usuario asociado utilizando el modelo de Usuario
    await usuarioModel.deleteOne({ _id: usuarioId });

    // Llama al siguiente middleware
    next();
  } catch (error) {
    console.error(error);
    // Maneja cualquier error que pueda ocurrir durante la eliminación
    next(error);
  }
});

AutenticacionSchema.plugin(require("mongoose-bcrypt"));
