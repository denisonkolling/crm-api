import { IsOptional, IsString, IsDate, IsNumber, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchTaskDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsIn(['Pending', 'Completed', 'In Progress'])
    status?: string; // e.g., Pending, Completed, In Progress

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDate!: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    accountReferenceId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    leadReferenceId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    opportunityReferenceId?: number;

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
    @IsIn(['title', 'description', 'status', 'dueDate', 'accountReferenceId', 'leadReferenceId', 'opportunityReferenceId'])
    sortBy?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'asc';
}