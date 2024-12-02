import { ApiProperty } from '@nestjs/swagger'
import { ContactDto } from 'src/contacts/dto/contact.dto';

export class CreateAccountDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    industry: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    contacts: ContactDto[];
}
