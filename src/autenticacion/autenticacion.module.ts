import { Module } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { AutenticacionController } from "./autenticacion.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AutenticacionSchema } from "./Schema/autenticacion.schema";
import { UsuarioSchema } from "src/usuario/Schema/usuario.schema";
import { RolSchema } from "src/rol/Schema/rol.schema";
import { ComercioSchema } from "src/comercio/schema/comercio.schema";
import { JwtStrategy } from "./strategy/jwt.strategy";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Usuario", schema: UsuarioSchema },
      { name: "Autenticacion", schema: AutenticacionSchema },
      { name: "Comercio", schema: ComercioSchema },
      { name: "Rol", schema: RolSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "12h" },
    }),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, JwtStrategy],
})
export class AutenticacionModule {}
