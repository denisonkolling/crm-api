import { Expose, Type } from "class-transformer";

class ContactResponseDto {
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;
}

export class AccountResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    industry: string;

    @Expose()
    website: string;

    @Expose()
    @Type(() => ContactResponseDto)
    contacts: ContactResponseDto[];

    @Expose()
    isDeleted: boolean;
}