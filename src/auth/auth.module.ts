import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'; // 1. Importa JwtModuleOptions
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,

    // Usamos registerAsync para cargar la configuración de forma asíncrona
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule], //
      inject: [ConfigService], //

      // 2. Definimos la 'factory' que crea las opciones
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => {
        // 3. Obtenemos el secreto (como string)
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET no está definido en el archivo .env');
        }

        // 4. ¡CAMBIO CLAVE!
        // Obtenemos la expiración como un NÚMERO
        // Le pasamos 86400 (1 día) como valor por defecto si no lo encuentra.
        const expiresIn = configService.get<number>('JWT_EXPIRES', 86400);

        // 5. Retornamos la configuración
        return {
          secret: secret,
          signOptions: {
            // 'expiresIn' ahora es de tipo 'number', lo cual
            // satisface el requerimiento de TypeScript.
            expiresIn: expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
