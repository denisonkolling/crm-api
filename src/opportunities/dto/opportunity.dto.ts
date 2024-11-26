import { ApiProperty } from "@nestjs/swagger";
import { AccountDto } from "src/accounts/dto/account.dto";
import { UserDto } from "src/users/dto/user.dto";

export class OpportunityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    stage: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createDate: Date;

    @ApiProperty()
    expectedCloseDate: Date;

    @ApiProperty()
    actualCloseDate: Date;

    @ApiProperty()
    probability: number; // e.g., 75 for 75%

    @ApiProperty()
    opportunityType: string; // e.g., "Novo Negócio", "Renovação"

    @ApiProperty()
    leadSource: string;

    @ApiProperty()
    mainCompetitor: string;

    @ApiProperty()
    priority: string; // e.g., "Alta", "Média", "Baixa"

    @ApiProperty()
    productCategory: string;

    @ApiProperty()
    followUpStatus: string; // e.g., "Pendente", "Completo"

    @ApiProperty()
    isDeleted: boolean = false;

    @ApiProperty()
    account: AccountDto;

    @ApiProperty()
    owner: UserDto;
}