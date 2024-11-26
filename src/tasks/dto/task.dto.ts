import { ApiProperty } from "@nestjs/swagger";
import { AccountDto } from "src/accounts/dto/account.dto";
import { LeadDto } from "src/leads/dto/lead.dto";
import { OpportunityDto } from "src/opportunities/dto/opportunity.dto";

export class TaskDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string; // e.g., Pending, Completed, In Progress

    @ApiProperty()
    dueDate: Date;

    @ApiProperty()
    account: AccountDto;

    @ApiProperty()
    lead: LeadDto;

    @ApiProperty()
    opportunity: OpportunityDto;

    @ApiProperty()
    isDeleted: boolean = false;
}