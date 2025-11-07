import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Perez',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@correo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'supersecret',
  })
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value?.trim())
  password: string;
}
