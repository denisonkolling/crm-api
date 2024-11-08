import { ApiProperty } from "@nestjs/swagger";

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
    accountId?: number;

    @ApiProperty()
    leadId?: number;

    @ApiProperty()
    opportunityId?: number;

}
