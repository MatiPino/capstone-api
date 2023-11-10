import { Module } from '@nestjs/common';
import { PublicacionController } from './publicacion.controller';
import { PublicacionService } from './publicacion.service';
import { PublicacionSchema } from './Schema/publicacion.schema';
import { MongooseModule } from "@nestjs/mongoose";
import { UsuarioSchema } from 'src/usuario/Schema/usuario.schema';

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: 'Publicacion', schema: PublicacionSchema },
    { name: 'Usuario', schema: UsuarioSchema}
  ])
],
  controllers: [PublicacionController],
  providers: [PublicacionService]
})
export class PublicacionModule {}
