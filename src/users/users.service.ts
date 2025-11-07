import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    // Inyectamos el repositorio de la entidad User
    // (Esto es posible gracias al TypeOrmModule.forFeature en users.module.ts)
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Crea una nueva instancia de usuario en la base de datos.
   * Usado por el AuthService durante el registro.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  /**
   * Busca un usuario por su email.
   * Es vital para el login y para verificar si un email ya existe.
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  /**
   * Busca un usuario por su ID.
   * Útil para el endpoint de 'profile'.
   */
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      // Reutilizamos la misma lógica de manejo de errores que en tu ProductosService
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // NOTA: La guía no incluye 'update' o 'remove' para usuarios,
  // ya que solo se enfoca en la autenticación.
  // Podrías añadirlos aquí fácilmente siguiendo el patrón de tu ProductosService.
}
