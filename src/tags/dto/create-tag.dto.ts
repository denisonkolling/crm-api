import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsHexColor, IsOptional } from 'class-validator';

export class CreateTagDto {

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsHexColor()
    @IsOptional()
    color?: string;
}