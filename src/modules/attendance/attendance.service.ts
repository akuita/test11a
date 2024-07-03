import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/entities/employees';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>
  ) {}

  async recordEmployeeCheckIn(employeeId: number, checkInTime: Date): Promise<{ success: boolean; message: string; checkInTime?: Date }> {
    // Step 1: Validate that the "employeeId" corresponds to an existing employee
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found.`);
    }

    // Step 2: Check if an "AttendanceRecord" entry exists for the "employeeId" with the current date and a null "check_out_time"
    const existingRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_time: checkInTime,
        check_out_time: null
      }
    });
    if (existingRecord) {
      throw new BadRequestException('Employee has already checked in today.');
    }

    // Step 3: Create a new "AttendanceRecord" entry
    const attendanceRecord = this.attendanceRecordRepository.create({
      employee_id: employeeId,
      check_in_time: checkInTime
    });
    await this.attendanceRecordRepository.save(attendanceRecord);

    // Step 4: Update the "status" field in the "Employee" entity
    employee.status = 'checked_in';
    await this.employeeRepository.save(employee);

    // Step 5: Return a success message with the check-in time
    return {
      success: true,
      message: 'Employee check-in recorded successfully.',
      checkInTime: checkInTime
    };
  }
}