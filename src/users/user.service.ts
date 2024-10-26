import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.em.create(User, createUserDto);
      await this.em.persistAndFlush(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.em.find(User, {});
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch users: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new InternalServerErrorException(`User with ID ${id} not found`);
      }

      this.em.assign(user, updateUserDto);
      await this.em.flush();

      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      user.isDeleted = true;
      await this.em.persistAndFlush(user);
      return user;

    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete user: ${error.message}`);
    }

  }
}