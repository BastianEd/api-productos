import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // Inyectamos el JwtService (que hicimos 'global' en el módulo)
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Método principal que NestJS ejecuta para validar el acceso.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtenemos el objeto 'request' de la petición HTTP
    const request = context.switchToHttp().getRequest();

    // Extraemos el token del header
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'No se proporcionó token de autorización',
      );
    }

    try {
      // 1. Verificamos la validez del token (firma y expiración)
      // Si falla (ej. token expirado o firma inválida), lanzará un error.
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // 2. Si el token es válido, adjuntamos el payload (datos del usuario)
      // al objeto 'request'. Esto nos permite acceder a 'req.user'
      // en cualquier controlador que use este Guard.
      request.user = payload;
    } catch (error) {
      // Capturamos cualquier error de verificación
      throw new UnauthorizedException('Token inválido o expirado');
    }

    // 3. Si todo sale bien, permitimos el acceso
    return true;
  }

  /**
   * Helper para extraer el token del header "Authorization: Bearer <token>"
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    // Obtenemos 'Bearer <token>' y lo separamos
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // Si no es tipo 'Bearer', devolvemos undefined
    return type === 'Bearer' ? token : undefined;
  }
}
