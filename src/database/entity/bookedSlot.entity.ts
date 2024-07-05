import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";
import { ProductEntity } from "./product.entity";
import { SlotEntity } from "./slot.entity";
import { AreaEntity } from "./area.entity";

@Entity()
@Index(["product_id", "slot_id"], { unique: true, where: "archived = false" })
@Index(["mobileNumber"], { unique: true, where: "archived = false" })
export class BookedSlotEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    mobileNumber: string;

    @Column()
    area_id: number;

    @ManyToOne(() => AreaEntity, (area) => area.bookedSlots)
    @JoinColumn({ name: 'area_id' })
    area: AreaEntity;

    @Column()
    slot_id: number;
    
    @ManyToOne(() => SlotEntity, (slot) => slot.bookedSlots)
    @JoinColumn({ name: 'slot_id' })
    slot: SlotEntity;
    
    @Column()
    product_id: number;

    @ManyToOne(() => ProductEntity, (product) => product.bookedSlots)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({ default: false })
    archived: boolean;

}