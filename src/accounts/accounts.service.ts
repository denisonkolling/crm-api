import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Account } from './entities/account.entity';
import { AccountSearchDto } from './dto/search-account.dto';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/entities/contact.entity';

@Injectable()
export class AccountsService {

  constructor(
    private readonly em: EntityManager,
    private readonly contactsService: ContactsService
  ) { }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { contacts, ...accountData } = createAccountDto;
    const account = new Account();

    this.em.assign(account, accountData);

    if (contacts && contacts.length > 0) {
      const foundContacts = await Promise.all(
        contacts.map(contact => this.contactsService.findOne(contact))
      );
      account.contacts.set(foundContacts);
    }

    await this.em.persistAndFlush(account);

    return account;
  }

  async findAll({ page, limit, sortBy, sortOrder }: { page: number; limit: number; sortBy: string; sortOrder: 'asc' | 'desc' }): Promise<{ data: Account[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const [data, total] = await this.em.findAndCount(Account, {}, {
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder }
    });

    return { data, total, page, limit };
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

    const { contacts, ...accountData } = updateAccountDto;

    if (contacts && contacts.length > 0) {
      const foundContacts = await Promise.all(
        contacts.map(async contactId => {
          const contact = await this.contactsService.findOne(contactId);
          return contact;
        }),
      );
      account.contacts.set(foundContacts);
    }

    this.em.assign(account, accountData);

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

  //TODO: Implementar findContactsByAccountId nos métodos create account e update account
  private async findContactById(contactId?: number): Promise<Contact | undefined> {
    if (!contactId) return undefined;
    return await this.contactsService.findOne(contactId);
  }
}
