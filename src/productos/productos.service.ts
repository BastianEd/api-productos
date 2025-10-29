// bastianed/api-productos/api-productos-1ccc975c1ebbadebcfe8eb26607a314ce689dbe9/src/productos/productos.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // ... (métodos create, findAll, findOne, update se mantienen igual) ...
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      const producto = this.productoRepository.create(createProductoDto);
      return await this.productoRepository.save(producto);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al crear el producto');
    }
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepository.preload({
      id,
      ...updateProductoDto,
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return await this.productoRepository.save(producto);
  }

  /**
   * 6. Metodo para Eliminar un Producto (Soft Delete)
   * Esta versión optimizada realiza una única operación en la base de datos
   * y verifica si alguna fila fue afectada para asegurar que la eliminación fue exitosa.
   */
  async remove(id: number): Promise<void> {
    const result = await this.productoRepository.softDelete(id);

    // Si la propiedad 'affected' es 0, significa que no se encontró
    // ningún producto con ese ID para eliminar.
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}
