import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCampaignDto {

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    description!: string;

    @ApiProperty()
    @IsString()
    status!: string; // e.g., Planned, Active, Completed, Archived

    @ApiProperty({ type: Date })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;

    @ApiProperty({ type: Date })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    leadsReferenceId?: number[];
}
