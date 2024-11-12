import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class TagEntityDto {
    @ApiProperty()
    @IsNumber()
    tagId!: number;

    @ApiProperty()
    @IsString()
    entityType!: string;

    @ApiProperty()
    @IsNumber()
    entityId!: number;
}