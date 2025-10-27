import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('productos')
export class Producto {
  @ApiProperty({ description: 'ID único del producto', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Laptop Pro',
    maxLength: 100,
  })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Una laptop potente para profesionales.',
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ description: 'El precio del producto', example: 1299.99 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ description: 'La cantidad de stock disponible', example: 50 })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty({
    description: 'La categoría a la que pertenece el producto',
    example: 'Electrónica',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  categoria: string;

  @ApiProperty({
    description: 'Indica si el producto está activo',
    example: true,
  })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    example: '2023-10-27T10:00:00.000Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de la última actualización del producto',
    example: '2023-10-27T11:00:00.000Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
