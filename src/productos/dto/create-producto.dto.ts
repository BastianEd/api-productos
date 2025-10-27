import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Laptop Pro',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Descripción detallada del producto (opcional)',
    example: 'Una laptop potente para profesionales.',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'El precio del producto',
    example: 1299.99,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  precio: number;

  @ApiProperty({
    description: 'La cantidad de stock disponible (opcional)',
    example: 50,
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @ApiProperty({
    description: 'La categoría a la que pertenece el producto (opcional)',
    example: 'Electrónica',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  categoria?: string;

  @ApiProperty({
    description:
      'Indica si el producto está activo (opcional, por defecto true)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
