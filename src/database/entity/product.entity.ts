import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookedSlotEntity } from "./bookedSlot.entity";

@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    @OneToMany(() => BookedSlotEntity, (bookedSlot) => bookedSlot.product)
    bookedSlots: BookedSlotEntity[];

    @Column({ default: false })
    archived: boolean;
}