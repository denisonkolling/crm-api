import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Account } from './entities/account.entity';
import { AccountSearchDto } from './dto/search-account.dto';
import { ContactsService } from 'src/contacts/contacts.service';

@Injectable()
export class AccountsService {

  constructor(
    private readonly em: EntityManager,
    private readonly contactsService: ContactsService
  ) { }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { contacts, ...accountData } = createAccountDto;
    const account = new Account();

    if (contacts && contacts.length > 0) {
      for (const { id } of contacts) {

        const existingContact = await this.contactsService.findOne(id);
        if (!existingContact) {
          throw new BadRequestException(`Contato com ID ${id} não encontrado.`);
        }

        account.contacts.add(existingContact);
      }
    }

    this.em.assign(account, accountData);

    await this.em.persistAndFlush(account);
    //TODO - Implemetar AccountResponseDto
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
    const account = await this.em.findOne(Account, id, { populate: ['contacts'] });
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
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

  async search(searchParams: AccountSearchDto): Promise<{
    data: Account[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
      name,
      industry,
      website
    } = searchParams;

    const offset = (page - 1) * limit;

    // Construir filtros dinamicamente
    const filters: any = { isDeleted: false };

    if (name) {
      filters.name = { $ilike: `%${name}%` };
    }
    if (industry) {
      filters.industry = { $ilike: `%${industry}%` };
    }
    if (website) {
      filters.website = { $ilike: `%${website}%` };
    }

    // Executar a query com os filtros
    const [accounts, total] = await Promise.all([
      this.em.find(Account, filters, {
        limit,
        offset,
        orderBy: { [sortBy]: sortOrder },
        populate: ['contacts', 'user'] // Opcional: popula relacionamentos
      }),
      this.em.count(Account, filters)
    ]);

    return {
      data: accounts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}
