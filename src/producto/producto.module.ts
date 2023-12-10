import { Module } from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { ProductoController } from "./producto.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductoSchema } from "./Schema/producto.schema";
import { ComercioSchema } from "src/comercio/schema/comercio.schema";
import { WsLogicaService } from "src/ws-logica/ws-logica.service";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { WebsocketService } from "src/websocket/websocket.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Producto", schema: ProductoSchema },
      { name: "Comercio", schema: ComercioSchema },
    ]),
  ],
  controllers: [ProductoController],
  providers: [
    ProductoService,
    //  WsLogicaService,
    // WebsocketGateway, WebsocketService
  ],
})
export class ProductoModule {}
