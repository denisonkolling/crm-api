import { ApiProperty } from "@nestjs/swagger";
import { AccountDto } from "src/accounts/dto/account.dto";

export class CreateUserDto {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    account: AccountDto;

}
