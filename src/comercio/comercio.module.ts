import { Module } from "@nestjs/common";
import { ComercioService } from "./comercio.service";
import { ComercioController } from "./comercio.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ComercioSchema } from "./schema/comercio.schema";
import { UsuarioSchema } from "src/usuario/Schema/usuario.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Comercio", schema: ComercioSchema },
      { name: "Usuario", schema: UsuarioSchema },
    ]),
  ],
  controllers: [ComercioController],
  providers: [ComercioService],
})
export class ComercioModule {}
