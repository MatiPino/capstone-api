import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from "@nestjs/common";

import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export default class RolGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext) {
    const roles: string[] = this.reflector.get<string[]>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException({
        success: false,
        message: "Usuario no autorizado",
      });
    }

    const tokenData = this.jwtService.decode(token);
    if (typeof tokenData == "string") {
      throw new UnauthorizedException({
        success: false,
        message: "Usuario no autorizado",
      });
    }

    const rolPermitido = roles.includes(tokenData.rol);
    if (!rolPermitido) {
      throw new UnauthorizedException({
        success: false,
        message: "Usuario no autorizado",
      });
    }
    return rolPermitido;
  }
}
