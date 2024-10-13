import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Account } from "../../accounts/entities/account.entity";

@Entity({ tableName: 'tab_users' })
export class User {
    @PrimaryKey()
    id: number;

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property()
    email: string;

    @Property()
    phone: string;

    @ManyToOne(() => Account, { nullable: true })
    account?: Account;
}
