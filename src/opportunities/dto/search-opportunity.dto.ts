import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, Min, IsString, IsIn, IsNumber, IsDateString } from "class-validator";

export class SearchOpportunityDto {

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
    @IsNumber()
    accountId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    stage?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    createdDateStart?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    createdDateEnd?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    opportunityType?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    priority?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    probabilityMin?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    probabilityMax?: number;
}
