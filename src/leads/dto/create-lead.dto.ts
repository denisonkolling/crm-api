import { ApiProperty } from "@nestjs/swagger";
export class CreateLeadDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    status: string; // e.g., New, Contacted, Qualified, etc.

    @ApiProperty()
    contactReferenceId?: number;

    @ApiProperty()
    accountReferenceId?: number;

    @ApiProperty()
    campaignReferenceId?: number;

}
