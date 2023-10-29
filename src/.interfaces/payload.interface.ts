export interface Payload {
  id: string;
  rut: string;
  nombre: string;
  apellido: string;
  correo: string;
  direccion?: string;
  telefono?: string;
  comercio?: string;
  rol: string;
}

// payload = {
//     id: usuario.usuario._id,
//     rut: usuario.rut,
//     nombre: usuario.usuario.nombre,
//     apellido: usuario.usuario.apellido,
//     correo: usuario.usuario.correo,
//     direccion: comercio.direccion || null,
//     telefono: comercio.telefono || null,
//     comercio: comercio._id || null,
//     rol: rol.rol,
//   };

// payload = {
//     id: usuario.usuario._id,
//     rut: usuario.rut,
//     nombre: usuario.usuario.nombre,
//     apellido: usuario.usuario.apellido,
//     correo: usuario.usuario.correo,
//     rol: rol.rol,
//   };
