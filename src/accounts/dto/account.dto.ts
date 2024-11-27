import { ApiProperty } from "@nestjs/swagger";
import { ContactDto } from "src/contacts/dto/contact.dto";

export class AccountDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    industry: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    contacts: ContactDto[];

    @ApiProperty()
    isDeleted: boolean;
}