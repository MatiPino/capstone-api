import { Module } from "@nestjs/common";
import { ProductoService } from "./producto.service";
import { ProductoController } from "./producto.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductoSchema } from "./Schema/producto.schema";
import { ComercioSchema } from "src/comercio/schema/comercio.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Producto", schema: ProductoSchema },
      { name: "Comercio", schema: ComercioSchema },
    ]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
