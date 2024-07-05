import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookedSlotEntity } from "./bookedSlot.entity";

@Entity()
export class AreaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => BookedSlotEntity, (bookedSlot) => bookedSlot.area)
    bookedSlots: BookedSlotEntity[];

    @Column({ default: false })
    archived: boolean;
}