import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContactSearchDto } from './dto/contact-search.dto';

@Controller('contacts')
@ApiTags('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number to retrieve (default is 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of contacts to retrieve per page (default is 10)' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Name to filter contacts by' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field by which to sort the contacts (default is "id")' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Order in which to sort the contacts (default is "asc")' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    return this.contactsService.findAll({ page, limit, sortOrder, sortBy, name });
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a contact by id' })
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Contact ID' })
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a contact by id' })
  @ApiProperty({ type: 'number' })
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a contact by id' })
  @ApiProperty({ type: 'number' })
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }

  @Get('search')
  async search(@Query() searchParams: ContactSearchDto) {
    return this.contactsService.search(searchParams);
  }
}
