import { Expose, Type } from 'class-transformer';

class ContactResponseDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}

class AccountResponseDto {
  @Expose()
  name: string;
}

export class LeadResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  contactReferenceId?: number;

  @Expose()
  accountReferenceId?: number;

  @Expose()
  isDeleted: boolean;

  @Expose()
  @Type(() => ContactResponseDto) // Transformar o objeto contact
  contact: ContactResponseDto;

  @Expose()
  @Type(() => AccountResponseDto) // Transformar o objeto account
  account: AccountResponseDto;
}