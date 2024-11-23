import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CampaignSearchParams } from './dto/search-campaign.dto';

@Controller('campaigns')
@ApiTags('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a campaign by id' })
  @ApiProperty({ type: 'number' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a campaign by id' })
  @ApiProperty({ type: 'number' })
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(+id, updateCampaignDto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a campaign by id' })
  @ApiProperty({ type: 'number' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search campaigns with filters' })
  async search(@Query() searchParams: CampaignSearchParams) {
    return this.campaignsService.search(searchParams);
  }
}
