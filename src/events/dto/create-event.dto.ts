import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    endTime: Date;

    @ApiProperty()
    accountId?: number;

    @ApiProperty()
    leadId?: number;

}
