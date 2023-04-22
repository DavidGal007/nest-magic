import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Base } from "../Base";
import { BankAccount } from "./BankAccount";

export enum EnumTypeCard {
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD'
}

@Entity('bank_card')
export class BankCard extends Base {

    @Column({unique: true, length: 16})
    number: string

    @Column({name: 'expire_date', nullable: false})
    expireDate: string

    @Column()
    cvc: number

    @Column({type: 'enum', enum: EnumTypeCard})
    type: EnumTypeCard

    @OneToOne(() => BankAccount, bankAccount => bankAccount.card)
    bankAccount: BankAccount


}