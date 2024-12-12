import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { AccountDto } from "src/accounts/dto/account.dto";

export class ContactDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    firstName: string;

    @ApiProperty()
    @Expose()
    lastName: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    phone: string;

    @ApiProperty()
    @Expose()
    @Type(() => AccountDto)
    account: AccountDto;

    @ApiProperty()
    @Expose()
    isDeleted: boolean;
}
