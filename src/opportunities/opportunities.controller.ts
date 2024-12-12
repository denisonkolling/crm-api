import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchOpportunityDto } from './dto/search-opportunity.dto';
import { plainToInstance } from 'class-transformer';
import { OpportunityDto } from './dto/opportunity.dto';

@Controller('opportunities')
@ApiTags('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new opportunity' })
  create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all opportunities' })
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
    return this.opportunitiesService.findAll({ page, limit, sortBy, sortOrder });
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get an opportunity by id' })
  findOne(@Param('id') id: number) {
    const opportunity = this.opportunitiesService.findOne(+id);
    return plainToInstance(OpportunityDto, opportunity, { excludeExtraneousValues: true });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an opportunity by id' })
  update(@Param('id') id: number, @Body() updateOpportunityDto: UpdateOpportunityDto) {
    const opportunity = this.opportunitiesService.update(+id, updateOpportunityDto);
    return plainToInstance(OpportunityDto, opportunity, { excludeExtraneousValues: true });
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete an opportunity by id' })
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.opportunitiesService.remove(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search opportunities with filters' })
  async search(@Query() searchDto: SearchOpportunityDto) {
    return this.opportunitiesService.search(searchDto);
  }
}
