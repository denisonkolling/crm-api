import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/accounts/entities/account.entity";

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
    account?: Account;

}

