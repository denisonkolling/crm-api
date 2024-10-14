import { ApiProperty } from '@nestjs/swagger'
export class CreateAccountDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    industry: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    contacts: number[];
}
