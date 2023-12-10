import { Injectable } from "@nestjs/common";
import { CreatePruebaDto } from "./dto/create-prueba.dto";
import { UpdatePruebaDto } from "./dto/update-prueba.dto";
import { WebsocketGateway } from "src/websocket/websocket.gateway";

@Injectable()
export class PruebaService {
  // constructor(private readonly wsg: WebsocketGateway) {}
  create(createPruebaDto: CreatePruebaDto) {
    return "This action adds a new prueba";
  }

  findAll() {
    return `This action returns all prueba`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prueba`;
  }

  update(id: number, updatePruebaDto: UpdatePruebaDto) {
    return `This action updates a #${id} prueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} prueba`;
  }
}
