import { ApiProperty } from "@nestjs/swagger";
import { Campaign } from "src/campaigns/entities/campaign.entity";

export class CreateLeadDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    company: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    status: string; // e.g., New, Contacted, Qualified, etc.

    @ApiProperty()
    campaign?: Campaign;

}
