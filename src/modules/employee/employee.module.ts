import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';
import { SystemInterface } from '../../entities/system_interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, AttendanceRecord, SystemInterface])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}