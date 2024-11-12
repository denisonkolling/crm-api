import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'tab_tags' })
export class Tag {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ default: '#000000' })
    color: string;
}

@Entity({ tableName: 'tab_taggables' })
export class Taggable {
    @PrimaryKey()
    id!: number;

    @Property()
    tag_id!: number;

    @Property()
    entity_type!: string;

    @Property()
    entity_id!: number;

    constructor(tag_id: number, entity_type: string, entity_id: number) {
        this.tag_id = tag_id;
        this.entity_type = entity_type;
        this.entity_id = entity_id;
    }
}