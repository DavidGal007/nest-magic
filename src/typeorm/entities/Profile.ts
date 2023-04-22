import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../Base";


@Entity({name: 'user_profiles'})
export class Profile extends Base {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    dob: string;
}