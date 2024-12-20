import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, Min, IsString, IsIn, IsNumber, IsDateString } from "class-validator";

export class SearchEventDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sortBy?: string = 'id';

    @ApiPropertyOptional()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'desc';

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    endTime?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    startTime?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    accountId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    leadId?: number;

}
