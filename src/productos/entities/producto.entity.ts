import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  @Column({ type: 'text', nullable: true })
  descripcion: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;
  @Column({ type: 'int', default: 0 })
  stock: number;
  @Column({ type: 'varchar', length: 50, nullable: true })
  categoria: string;
  @Column({ type: 'boolean', default: true })
  activo: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}