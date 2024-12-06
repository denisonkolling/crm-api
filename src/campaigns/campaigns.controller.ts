import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CampaignSearchParams } from './dto/search-campaign.dto';
import { CampaignResponseDto } from './dto/response-campaign.dto';
import { plainToInstance } from 'class-transformer';
import { MapperUtil } from 'src/common/utils/mapper.util';

@Controller('campaigns')
@ApiTags('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCampaignDto: CreateCampaignDto): Promise<CampaignResponseDto> {
    const campaign = await this.campaignsService.create(createCampaignDto);
    // TODO: Determine if populating leads in the campaign is essential for the current functionality or can be deferred to improve performance.
    // const campaignResponse = plainToInstance(CampaignResponseDto, { ...campaign, leads: campaign.leads.toArray() }, { excludeExtraneousValues: true });
    // WIP: Developing generic method to convert entity to DTO using MapperUtil
    const campaignResponse = MapperUtil.mapToDto(CampaignResponseDto, campaign);
    return campaignResponse;
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a campaign by id' })
  @ApiProperty({ type: 'number' })
  findOne(@Param('id') id: number) {
    const campaign = this.campaignsService.findOne(+id);
    return plainToInstance(CampaignResponseDto, campaign, { excludeExtraneousValues: true });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a campaign by id' })
  @ApiProperty({ type: 'number' })
  update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(+id, updateCampaignDto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a campaign by id' })
  @ApiProperty({ type: 'number' })
  remove(@Param('id') id: number) {
    return this.campaignsService.remove(+id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search campaigns with filters' })
  async search(@Query() searchParams: CampaignSearchParams) {
    return this.campaignsService.search(searchParams);
  }
}
