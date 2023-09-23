import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './Schema/producto.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Producto', schema:ProductoSchema}])
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
