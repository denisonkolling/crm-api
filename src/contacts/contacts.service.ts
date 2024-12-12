import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { ContactSearchDto } from './dto/contact-search.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class ContactsService {

  constructor(
    private readonly em: EntityManager,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService
  ) { }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = new Contact();

    const account = await this.findAccountById(createContactDto.accountId);

    contact.account = account;

    //eslint-disable-next-line
    const { accountId, ...contactData } = createContactDto;

    this.em.assign(contact, contactData);

    await this.em.persistAndFlush(contact);

    return contact
  }

  async findAll({ page, limit, sortBy, sortOrder, name }: { page: number, limit: number, sortBy: string, sortOrder: 'asc' | 'desc', name?: string }): Promise<Contact[]> {
    const offset = (page - 1) * limit;
    const filters = name ? { firstName: { $ilike: `%${name}%` } } : {};
    return this.em.find(Contact, filters, {
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder }
    });
  }

  async findOne(id: number) {
    const contact = await this.em.findOne(Contact, id);

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = this.em.findOne(Contact, { id });
    this.em.assign(contact, updateContactDto);
    await this.em.persistAndFlush(contact);
    return contact;
  }

  async remove(id: number) {
    const contact = await this.em.findOne(Contact, { id });

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }
    return {
      statusCode: 204,
      message: `Account with id ${id} has been successfully deleted.`,
    };
  }

  async search(params: ContactSearchDto) {
    const { firstName, lastName, email, phone, page, limit, sortBy, sortOrder } = params;

    const query = this.em.createQueryBuilder(Contact, 'c');

    if (firstName) {
      query.where({ firstName: { $ilike: `%${firstName}%` } });
    }
    if (lastName) {
      query.andWhere({ lastName: { $ilike: `%${lastName}%` } });
    }
    if (email) {
      query.andWhere({ email: { $ilike: `%${email}%` } });
    }
    if (phone) {
      query.andWhere({ phone: { $ilike: `%${phone}%` } });
    }

    // Ordenação
    if (sortBy) {
      query.orderBy({ [`c.${sortBy}`]: sortOrder });
    }

    // Calcular offset baseado na página
    const offset = (page - 1) * limit;

    const [data, total] = await query
      .limit(limit)
      .offset(offset)
      .getResultAndCount();

    // Calcular metadata da paginação
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  private async findAccountById(accountId?: number): Promise<Account | undefined> {
    if (!accountId) return undefined;
    return await this.accountsService.findOne(accountId);
  }
}
