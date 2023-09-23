import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { RegistroSchema } from './Schema/registro.schema';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name:'Registro', schema :  RegistroSchema}
    ])
  ],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule {}
