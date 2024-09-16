import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ name: 'cell_phone' })
  cellphone: string;
  @Column()
  email?: string;

  constructor(input: Partial<ContactEntity>) {
    Object.assign(this, input);
  }
}
