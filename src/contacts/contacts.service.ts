import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class ContactsService {

  constructor(
    private readonly em: EntityManager,
  ) { }

  async create(createContactDto: CreateContactDto) {
    const contact = new Contact();
    this.em.assign(contact, createContactDto);
    await this.em.persistAndFlush(contact);
    return contact;
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
    return this.em.findOne(Contact, id);
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
}
