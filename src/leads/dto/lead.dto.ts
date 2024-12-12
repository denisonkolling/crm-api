import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { AccountDto } from "src/accounts/dto/account.dto";
import { CampaignDto } from "src/campaigns/dto/campaign.dto";
import { ContactDto } from "src/contacts/dto/contact.dto";

export class LeadDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    leadType: string;

    @ApiProperty()
    @Expose()
    status: string;

    @ApiProperty({ type: ContactDto })
    // @ValidateNested()
    @Expose()
    @Type(() => ContactDto)
    contact: ContactDto;

    @ApiProperty({ type: AccountDto })
    // @ValidateNested()
    @Expose()
    @Type(() => AccountDto)
    account: AccountDto;

    @ApiProperty({ type: CampaignDto })
    // @ValidateNested()
    @Expose()
    @Type(() => CampaignDto)
    campaign: CampaignDto;

    @ApiProperty()
    @Expose()
    isDeleted: boolean;
}