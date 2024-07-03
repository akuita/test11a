import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Employee } from 'src/entities/employees';
import { AttendanceRecord } from 'src/entities/attendance_records';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, AttendanceRecord])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
  exports: [AttendanceService],
})
export class AttendanceModule {}