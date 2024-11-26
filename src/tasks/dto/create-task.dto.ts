import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/accounts/entities/account.entity";
import { Lead } from "src/leads/entities/lead.entity";
import { Opportunity } from "src/opportunities/entities/opportunity.entity";

export class CreateTaskDto {

    @ApiProperty()
    title!: string;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    status!: string; // e.g., Pending, Completed, In Progress

    @ApiProperty()
    dueDate!: Date;

    @ApiProperty()
    account?: Account

    @ApiProperty()
    lead?: Lead;

    @ApiProperty()
    opportunity?: Opportunity;

}
