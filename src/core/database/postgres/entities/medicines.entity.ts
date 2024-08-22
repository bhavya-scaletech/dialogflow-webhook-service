import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Disease } from './disease.entity';

@Entity({ name: 'medicines' })
export class Medicines extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Disease)
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;
  @Column({ name: 'disease_id' })
  disease_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dosage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  frequency: string;

  @Column({ type: 'integer', nullable: true })
  available_quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  rate_per_unit: number;

  @Column({ type: 'integer', nullable: true })
  quantity_per_unit: number;
}
