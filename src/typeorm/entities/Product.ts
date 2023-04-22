import { Column, Entity } from "typeorm";
import { Base } from "../Base";

@Entity()
export class Product extends Base {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;
}