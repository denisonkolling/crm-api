import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { AccountDto } from "src/accounts/dto/account.dto";
import { CampaignDto } from "src/campaigns/dto/campaign.dto";
import { ContactDto } from "src/contacts/dto/contact.dto";

export class LeadDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    leadType: string;

    @ApiProperty()
    status: string;

    @ApiProperty({ type: ContactDto })
    @ValidateNested()
    @Type(() => ContactDto)
    contact: ContactDto;

    @ApiProperty({ type: AccountDto })
    @ValidateNested()
    @Type(() => AccountDto)
    account: AccountDto;

    @ApiProperty({ type: CampaignDto })
    @ValidateNested()
    @Type(() => CampaignDto)
    campaign: CampaignDto;

    @ApiProperty()
    isDeleted: boolean;
}