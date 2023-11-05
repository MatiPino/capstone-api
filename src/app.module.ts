import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AutenticacionModule } from "./autenticacion/autenticacion.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { RegistroModule } from "./registro/registro.module";
import { ProductoModule } from "./producto/producto.module";
import { ProveedorModule } from "./proveedor/proveedor.module";
import { ComercioModule } from "./comercio/comercio.module";
import { MongooseModule } from "@nestjs/mongoose";
import { RolModule } from "./rol/rol.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { PublicacionModule } from './publicacion/publicacion.module';
import { PruebaModule } from './prueba/prueba.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://anperkins:oegPUpEmKBdeJqGg@cluster0.qz6sj4p.mongodb.net/capstone"),
    AutenticacionModule,
    UsuarioModule,
    RegistroModule,
    ProductoModule,
    ProveedorModule,
    ComercioModule,
    RolModule,
    WebsocketModule,
    PublicacionModule,
    PruebaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
