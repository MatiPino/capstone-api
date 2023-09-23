import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { ProveedorSchema } from './Schema/proveedor.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      {name:'Proveedor',schema:ProveedorSchema}])
    ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
