import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({
    status: 201,
    description: 'El producto ha sido creado exitosamente.',
    type: Producto,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los productos.',
    type: [Producto],
  })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', description: 'ID del producto a buscar' })
  @ApiResponse({
    status: 200,
    description: 'El producto encontrado.',
    type: Producto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', description: 'ID del producto a actualizar' })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({
    status: 200,
    description: 'El producto ha sido actualizado.',
    type: Producto,
  })
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del producto a eliminar' })
  @ApiResponse({
    status: 204,
    description: 'El producto ha sido eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
