import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LeadResponseDto } from './dto/response-lead.dto';
import { plainToClass } from 'class-transformer';
import { LeadDto } from './dto/lead.dto';

@Controller('leads')
@ApiTags('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createLeadDto: CreateLeadDto): Promise<LeadResponseDto> {
    const lead = await this.leadsService.create(createLeadDto);
    return plainToClass(LeadResponseDto, lead, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get all leads' })
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lead by id' })
  findOne(@Param('id') id: number) {
    const lead = this.leadsService.findOne(+id);
    return plainToClass(LeadDto, lead, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lead by id' })
  update(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lead by id' })
  remove(@Param('id') id: number) {
    return this.leadsService.remove(+id);
  }
}
