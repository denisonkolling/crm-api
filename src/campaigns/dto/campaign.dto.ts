import { ApiProperty } from "@nestjs/swagger";
import { CampaignStatus } from "../enums/campaign-status.enum";
import { LeadDto } from "src/leads/dto/lead.dto";
import { Expose } from "class-transformer";

export class CampaignDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    status: CampaignStatus;

    @ApiProperty()
    @Expose()
    startDate: Date;

    @ApiProperty()
    @Expose()
    endDate: Date;

    @ApiProperty()
    @Expose()
    leads: LeadDto[];
}