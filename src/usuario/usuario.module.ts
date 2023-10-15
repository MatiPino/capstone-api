import { Module } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioController } from "./usuario.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UsuarioSchema } from "./Schema/usuario.schema";
import { AutenticacionSchema } from "src/autenticacion/Schema/autenticacion.schema";
import { RolSchema } from "src/rol/Schema/rol.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Usuario", schema: UsuarioSchema },
      { name: "Autenticacion", schema: AutenticacionSchema },
      { name: "Rol", schema: RolSchema },
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
