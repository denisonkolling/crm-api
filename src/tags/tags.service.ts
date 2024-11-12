import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag, Taggable } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntityDto } from './dto/tag-entity.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
    @InjectRepository(Taggable)
    private readonly taggableRepository: EntityRepository<Taggable>,
    private readonly em: EntityManager,
  ) { }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);
    await this.em.persistAndFlush(tag);
    return tag;
  }

  async addTagToEntity(tagEntityDto: TagEntityDto): Promise<void> {
    const taggable = new Taggable(
      tagEntityDto.tagId,
      tagEntityDto.entityType,
      tagEntityDto.entityId,
    );
    await this.em.persistAndFlush(taggable);
  }

  async removeTagFromEntity(tagEntityDto: TagEntityDto): Promise<void> {
    await this.em.nativeDelete(Taggable, {
      tag_id: tagEntityDto.tagId,
      entity_type: tagEntityDto.entityType,
      entity_id: tagEntityDto.entityId,
    });
  }

  async getEntityTags(entityType: string, entityId: number): Promise<Tag[]> {
    const knex = this.em.getKnex();
    const result = await this.em.execute(
      knex
        .select('t.*')
        .from('tab_tags as t')
        .innerJoin('tab_taggables as tg', function () {
          this.on('t.id', '=', 'tg.tag_id')
            .andOn('tg.entity_type', '=', knex.raw('?', [entityType]))
            .andOn('tg.entity_id', '=', knex.raw('?', [entityId]));
        })
        .toQuery()
    );
    return result.map(row => this.em.map(Tag, row));
  }

  async getEntitiesByTag(tagId: number, entityType: string): Promise<number[]> {
    const taggables = await this.em.find(Taggable, {
      tag_id: tagId,
      entity_type: entityType,
    });
    return taggables.map(t => t.entity_id);
  }

  async getPopularTags(limit: number = 10): Promise<any[]> {
    const knex = this.em.getKnex();
    const result = await this.em.execute(
      knex
        .select('t.*')
        .count('tg.tag_id as usage_count')
        .from('tab_tags as t')
        .leftJoin('tab_taggables as tg', 't.id', 'tg.tag_id')
        .groupBy('t.id')
        .orderBy('usage_count', 'desc')
        .limit(limit)
        .toQuery()
    );
    return result;
  }
}