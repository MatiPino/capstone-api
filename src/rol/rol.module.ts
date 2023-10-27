import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule} from '@nestjs/mongoose'
import { RolSchema } from './Schema/rol.schema';
import { AutenticacionSchema } from 'src/autenticacion/Schema/autenticacion.schema';
@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Rol', schema: RolSchema},
      {name: 'Autenticacion', schema: AutenticacionSchema}
  ])
],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
