import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { AccountDto } from "src/accounts/dto/account.dto";
import { LeadDto } from "src/leads/dto/lead.dto";
import { OpportunityDto } from "src/opportunities/dto/opportunity.dto";

export class TaskDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    status: string; // e.g., Pending, Completed, In Progress

    @ApiProperty()
    @Expose()
    dueDate: Date;

    @ApiProperty()
    @Expose()
    @Type(() => AccountDto)
    account: AccountDto;

    @ApiProperty()
    @Expose()
    @Type(() => LeadDto)
    lead: LeadDto;

    @ApiProperty()
    @Expose()
    @Type(() => OpportunityDto)
    opportunity: OpportunityDto;

    @ApiProperty()
    @Expose()
    isDeleted: boolean = false;
}