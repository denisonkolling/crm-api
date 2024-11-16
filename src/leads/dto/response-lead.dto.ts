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

class CampaignResponseDto {
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
  campaignReferenceId?: number;

  @Expose()
  isDeleted: boolean;

  @Expose()
  @Type(() => ContactResponseDto)
  contact: ContactResponseDto;

  @Expose()
  @Type(() => AccountResponseDto)
  account: AccountResponseDto;

  @Expose()
  @Type(() => CampaignResponseDto)
  campaign: CampaignResponseDto;
}