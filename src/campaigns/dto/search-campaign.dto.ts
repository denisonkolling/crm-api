import { IsOptional, IsString, IsDate, IsNumber, IsIn, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CampaignSearchParams {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsIn(['Planned', 'Active', 'Completed', 'Archived'])
    status?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    hasActiveLeads?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    pageSize?: number = 10;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsIn(['name', 'status', 'startDate', 'endDate', 'hasActiveLeads'])
    sortBy?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'asc';
}