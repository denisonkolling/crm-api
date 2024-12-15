import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CampaignSearchParams } from './dto/search-campaign.dto';
import { CampaignResponseDto } from './dto/response-campaign.dto';
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
    const dto = MapperUtil.mapToDto(CampaignResponseDto, campaign);
    return dto;
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number to retrieve (default is 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of campaigns to retrieve per page (default is 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field by which to sort the campaigns (default is "id")' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Order in which to sort the campaigns (default is "asc")' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    return this.campaignsService.findAll({ page, limit, sortBy, sortOrder });
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a campaign by id' })
  @ApiProperty({ type: 'number' })
  findOne(@Param('id') id: number) {
    const campaign = this.campaignsService.findOne(+id);
    const dto = MapperUtil.mapToDto(CampaignResponseDto, campaign);
    return dto;
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a campaign by id' })
  @ApiProperty({ type: 'number' })
  update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto) {
    const campaign = this.campaignsService.update(+id, updateCampaignDto);
    const dto = MapperUtil.mapToDto(CampaignResponseDto, campaign);
    return dto;
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a campaign by id' })
  @ApiProperty({ type: 'number' })
  remove(@Param('id') id: number) {
    const campaign = this.campaignsService.remove(+id);
    const dto = MapperUtil.mapToDto(CampaignResponseDto, campaign);
    return dto;
  }

  @Get('search')
  @ApiOperation({ summary: 'Search campaigns with filters' })
  async search(@Query() searchParams: CampaignSearchParams) {
    return this.campaignsService.search(searchParams);
  }
}
