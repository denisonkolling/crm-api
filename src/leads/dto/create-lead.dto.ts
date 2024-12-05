import { ApiProperty } from "@nestjs/swagger";
export class CreateLeadDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    status: string; // e.g., New, Contacted, Qualified, etc.

    @ApiProperty()
    leadType?: string; // e.g., Customer, Partner, Vendor, etc.

    @ApiProperty()
    contactId?: number;

    @ApiProperty()
    accountId?: number;

    @ApiProperty()
    campaignId?: number;

}
