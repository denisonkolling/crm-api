import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateTaskDto {

    @ApiProperty()
    @Expose()
    title!: string;

    @ApiProperty()
    @Expose()
    description!: string;

    @ApiProperty()
    @Expose()
    status!: string; // e.g., Pending, Completed, In Progress

    @ApiProperty()
    @Expose()
    dueDate!: Date;

    @ApiProperty()
    @Expose()
    accountId?: number;

    @ApiProperty()
    leadId?: number;

    @ApiProperty()
    opportunityId?: number;

}
