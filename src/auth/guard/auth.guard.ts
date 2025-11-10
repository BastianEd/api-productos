import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * 1. Definimos la forma de nuestro Payload de JWT.
 * Esto debe coincidir con lo que pones en `auth.service.ts`
 * al firmar el token (sub, email, name, rol).
 */
interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  rol: string;
}

/**
 * 2. Extendemos la Request de Express para añadir
 * la propiedad `user`, que ahora será de tipo `JwtPayload`.
 */
interface AuthRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'No se proporcionó token de autorización',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request.user = payload;
    } catch {
      // 3. (CORREGIDO) Eliminamos la variable del catch.
      // Esta sintaxis de 'catch' vacío es moderna y
      // le dice a ESLint que intencionalmente no nos importa el error.
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
