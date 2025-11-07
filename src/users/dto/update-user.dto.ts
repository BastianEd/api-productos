import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType toma todas las validaciones de CreateUserDto
// y las vuelve opcionales. Perfecto para operaciones PATCH.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
