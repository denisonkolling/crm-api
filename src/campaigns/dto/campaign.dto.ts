import { ApiProperty } from "@nestjs/swagger";
import { CampaignStatus } from "../enums/campaign-status.enum";
import { LeadDto } from "src/leads/dto/lead.dto";

export class CampaignDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: CampaignStatus;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    leads: LeadDto[];
}