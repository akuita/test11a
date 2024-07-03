import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee';

@Column('timestamp with time zone', { name: 'check_in_time', nullable: true })
check_in_time: Date;

@Column('timestamp with time zone', { name: 'check_out_time', nullable: true })
check_out_time: Date;

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;

  @ManyToOne(() => Employee, employee => employee.attendance_records)
  @Column('int', { name: 'employee_id' })
  employee_id: number;
}