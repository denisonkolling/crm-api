import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    accountId?: number;

}

