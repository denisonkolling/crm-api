import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntityDto } from './dto/tag-entity.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }

  @Post('entity')
  @ApiOperation({ summary: 'Add tag to entity' })
  async addTagToEntity(@Body() tagEntityDto: TagEntityDto) {
    return await this.tagsService.addTagToEntity(tagEntityDto);
  }

  @Delete('entity')
  @ApiOperation({ summary: 'Remove tag from entity' })
  async removeTagFromEntity(@Body() tagEntityDto: TagEntityDto) {
    return await this.tagsService.removeTagFromEntity(tagEntityDto);
  }

  @Get('entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Get all tags for an entity' })
  async getEntityTags(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: number,
  ) {
    return await this.tagsService.getEntityTags(entityType, entityId);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular tags' })
  async getPopularTags(@Query('limit') limit?: number) {
    return await this.tagsService.getPopularTags(limit);
  }
}