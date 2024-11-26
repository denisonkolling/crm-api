import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
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

    @Property()
    password: string;

    // ------------------------------------------------------------------------
    // ❓⚠️ This is a one-to-many relationship. A user can have many accounts?
    // ------------------------------------------------------------------------

    @OneToMany(() => Account, account => account.user)
    account?: Account;

    @Property()
    isDeleted: boolean = false;
}
