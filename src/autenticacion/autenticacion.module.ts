import { Module } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { AutenticacionController } from "./autenticacion.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AutenticacionSchema } from "./Schema/autenticacion.schema";
import { UsuarioSchema } from "src/usuario/Schema/usuario.schema";
import { RolSchema } from "src/rol/Schema/rol.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Autenticacion", schema: AutenticacionSchema },
      { name: "Usuario", schema: UsuarioSchema },
      { name: "Rol", schema: RolSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "120s" },
    }),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, JwtService],
})
export class AutenticacionModule {}
