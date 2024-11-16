import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an opportunity by id' })
  findOne(@Param('id') id: number) {
    return this.opportunitiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an opportunity by id' })
  update(@Param('id') id: number, @Body() updateOpportunityDto: UpdateOpportunityDto) {
    return this.opportunitiesService.update(+id, updateOpportunityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an opportunity by id' })
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.opportunitiesService.remove(id);
  }
}
