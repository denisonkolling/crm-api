import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tag, Taggable } from './entities/tag.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Tag, Taggable])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
