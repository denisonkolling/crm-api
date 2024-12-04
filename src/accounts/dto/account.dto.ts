import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ContactDto } from "src/contacts/dto/contact.dto";

// class ContactResponseDto {
//     @ApiProperty()
//     firstName: string;

//     @ApiProperty()
//     lastName: string;
// }

export class AccountDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    industry: string;

    @ApiProperty()
    @Expose()
    website: string;

    @ApiProperty()
    @Expose()
    @Type(() => ContactDto)
    contacts: ContactDto[];

    @ApiProperty()
    @Expose()
    isDeleted: boolean;
}