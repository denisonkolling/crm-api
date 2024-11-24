import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { CampaignStatus } from "../enums/campaign-status.enum";

export class CreateCampaignDto {

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    description!: string;

    @ApiProperty({ enum: CampaignStatus })
    @IsEnum(CampaignStatus, { message: 'Planned, Active, Completed, Archived, Draft, Cancelled, Paused, Expired, Failed, Under Review, Suspended, Testing' })
    status!: CampaignStatus;

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
