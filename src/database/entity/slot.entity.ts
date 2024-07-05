import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookedSlotEntity } from "./bookedSlot.entity";

@Entity()
export class SlotEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => BookedSlotEntity, (bookedSlot) => bookedSlot.slot)
    bookedSlots: BookedSlotEntity[];

    @Column({ default: false })
    archived: boolean;
}