import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreateOpportunityDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stage: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    accountId?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdDate?: Date = new Date();

    @ApiProperty()
    @IsOptional()
    @IsDate()
    expectedCloseDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    actualCloseDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    probability?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    opportunityType?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    leadSource?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    ownerId?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    mainCompetitor?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    priority?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productCategory?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    followUpStatus?: string;

}
