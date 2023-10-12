import { Module } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { AutenticacionController } from "./autenticacion.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AutenticacionSchema } from "./Schema/autenticacion.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Autenticacion", schema: AutenticacionSchema }]),
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
