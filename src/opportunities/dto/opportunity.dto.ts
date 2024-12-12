import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { AccountDto } from "src/accounts/dto/account.dto";
import { UserDto } from "src/users/dto/user.dto";

export class OpportunityDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    amount: number;

    @ApiProperty()
    @Expose()
    stage: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    createDate: Date;

    @ApiProperty()
    @Expose()
    expectedCloseDate: Date;

    @ApiProperty()
    @Expose()
    actualCloseDate: Date;

    @ApiProperty()
    @Expose()
    probability: number; // e.g., 75 for 75%

    @ApiProperty()
    @Expose()
    opportunityType: string; // e.g., "Novo Negócio", "Renovação"

    @ApiProperty()
    @Expose()
    leadSource: string;

    @ApiProperty()
    @Expose()
    mainCompetitor: string;

    @ApiProperty()
    @Expose()
    priority: string; // e.g., "Alta", "Média", "Baixa"

    @ApiProperty()
    @Expose()
    productCategory: string;

    @ApiProperty()
    @Expose()
    followUpStatus: string; // e.g., "Pendente", "Completo"

    @ApiProperty()
    @Expose()
    isDeleted: boolean = false;

    @ApiProperty()
    @Expose()
    account: AccountDto;

    @ApiProperty()
    @Expose()
    owner: UserDto;
}