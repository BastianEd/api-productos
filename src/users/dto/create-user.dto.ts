import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Asegúrate de que coincida con la validación de RegisterDto
  password: string;

  // El 'rol' se asigna con un valor por defecto en la entidad,
  // por lo que no es necesario aquí.
}
