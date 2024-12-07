import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountSearchDto } from './dto/search-account.dto';
import { AccountDto } from './dto/account.dto';
import { MapperUtil } from 'src/common/utils/mapper.util';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
    const account = await this.accountsService.create(createAccountDto);
    const dto = MapperUtil.mapToDto(AccountDto, account);
    return dto;
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts with pagination and sorting options' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number to retrieve (default is 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of accounts to retrieve per page (default is 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field by which to sort the accounts (default is "id")' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Order in which to sort the accounts (default is "asc")' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    return this.accountsService.findAll({ page, limit, sortBy, sortOrder });
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get an account by id' })
  async findOne(@Param('id') id: number) {
    const account = await this.accountsService.findOne(+id);
    const dto = MapperUtil.mapToDto(AccountDto, account);
    return dto;
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an account by id' })
  async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto) {
    const account = await this.accountsService.update(+id, updateAccountDto);
    const dto = MapperUtil.mapToDto(AccountDto, account);
    return dto;
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete an account by id' })
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }

  @Get('search')
  async search(@Query() searchParams: AccountSearchDto) {
    return this.accountsService.search(searchParams);
  }
}
