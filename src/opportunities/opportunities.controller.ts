import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('opportunities')
@ApiTags('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) { }

  @Post()
  create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get()
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.opportunitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOpportunityDto: UpdateOpportunityDto) {
    return this.opportunitiesService.update(+id, updateOpportunityDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.opportunitiesService.remove(id);
  }
}
