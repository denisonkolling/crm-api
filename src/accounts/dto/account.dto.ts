import { ApiProperty } from "@nestjs/swagger";

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
    contacts: number[];
}