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
  // 1. Inyección del Repositorio
  constructor(
    @InjectRepository(Producto) //
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // 2. Metodo para Crear un Producto
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      const producto = this.productoRepository.create(createProductoDto);
      return await this.productoRepository.save(producto);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al crear el producto');
    }
  }

  // 3. Metodo para Obtener todos los Productos
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  // 4. Metodo para Obtener un Producto por ID
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // 5. Metodo para Actualizar un Producto
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

  // 6. Metodo para Eliminar un Producto (Soft Delete)
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productoRepository.softDelete(id);
  }
}