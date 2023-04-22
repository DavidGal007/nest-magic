import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { Base } from "../Base";
import { BankCard } from "./BankCard";
import { User } from "./User";

@Entity('bank_account')
export class BankAccount extends Base {

    @Column({unique: true})
    number: string

    @Column({default: 0})
    balance: number

    @OneToOne(() => BankCard, (card) => card.bankAccount, {cascade: true})
    @JoinColumn()
    card: BankCard

    @ManyToOne(() => User, (user) => user.bankAccounts)
    user?: User

    //surving
}