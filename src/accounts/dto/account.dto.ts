import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

class ContactResponseDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;
}

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
    @Type(() => ContactResponseDto)
    contacts: ContactResponseDto[];

    @ApiProperty()
    isDeleted: boolean;
}