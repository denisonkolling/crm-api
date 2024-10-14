import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {

  constructor(
    private readonly em: EntityManager,
  ) { }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    this.em.assign(account, createAccountDto);
    await this.em.persistAndFlush(account);
    return account;
  }


  async findAll({ page, limit, sortBy, sortOrder }: { page: number; limit: number; sortBy: string; sortOrder: 'asc' | 'desc' }): Promise<Account[]> {
    const offset = (page - 1) * limit;
    return this.em.find(Account, {}, {
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder }
    });
  }

  async findOne(id: number): Promise<Account> {
    return this.em.findOne(Account, id, { populate: ['contacts'] });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.em.findOne(Account, { id });
    this.em.assign(account, updateAccountDto);
    await this.em.persistAndFlush(account);
    return account;
  }

  async remove(id: number) {
    const account = await this.em.findOne(Account, { id });

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    account.isDeleted = true;
    await this.em.persistAndFlush(account);

    return {
      statusCode: 204,
      message: `Account with id ${id} has been successfully deleted.`,
    };
  }
}
