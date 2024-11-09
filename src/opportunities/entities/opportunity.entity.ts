import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Account } from '../../accounts/entities/account.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'tab_opportunities' })
export class Opportunity {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    amount!: number;

    @Property()
    stage!: string; // e.g., Prospecting, Qualification, Closed Won, Closed Lost

    @Property()
    description?: string;

    @Property()
    createdDate?: Date = new Date();

    @Property()
    expectedCloseDate?: Date;

    @Property()
    actualCloseDate?: Date;

    @Property()
    probability?: number; // e.g., 75 for 75%

    @Property()
    opportunityType?: string; // e.g., "Novo Negócio", "Renovação"

    @Property()
    leadSource?: string;

    @Property()
    mainCompetitor?: string;

    @Property()
    priority?: string; // e.g., "Alta", "Média", "Baixa"

    @Property()
    productCategory?: string;

    @Property()
    followUpStatus?: string; // e.g., "Pendente", "Completo"

    @Property()
    isDeleted: boolean = false;

    @ManyToOne(() => Account, { nullable: true })
    account?: Account;

    @ManyToOne(() => User, { nullable: true })
    owner?: User;
}