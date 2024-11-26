import { ApiProperty } from "@nestjs/swagger";
import { AccountDto } from "src/accounts/dto/account.dto";

export class ContactDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    account: AccountDto;

    @ApiProperty()
    isDeleted: boolean;
}
