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
import { PublicacionModule } from "./publicacion/publicacion.module";
import { PruebaModule } from "./prueba/prueba.module";
import { ChatModule } from "./chat/chat.module";
import { TicketsModule } from "./tickets/tickets.module";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb+srv://Matias:hnOVxwQB2aKAn5dD@ai-zi.skmfqrb.mongodb.net/capstone"),
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
    ChatModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
