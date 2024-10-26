import { ApiProperty } from "@nestjs/swagger";
import { Lead } from "src/leads/entities/lead.entity";

export class CreateCampaignDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string; // e.g., Planned, Active, Completed, Archived

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    leads: Lead[];
}
