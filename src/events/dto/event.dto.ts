import { ApiProperty } from "@nestjs/swagger";
import { AccountDto } from "src/accounts/dto/account.dto";
import { LeadDto } from "src/leads/dto/lead.dto";

export class EventDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    endTime: Date;

    @ApiProperty()
    account: AccountDto;

    @ApiProperty()
    lead: LeadDto;

    @ApiProperty()
    isDeleted: boolean;
}