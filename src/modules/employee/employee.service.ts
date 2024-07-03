import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';
import { SystemInterface } from '../../entities/system_interfaces';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    @InjectRepository(SystemInterface)
    private systemInterfaceRepository: Repository<SystemInterface>,
  ) {}

  async getEmployeeCheckInStatus(employeeId: number): Promise<{
    currentDateTime: Date;
    employeeName: string;
    employeeRole: string;
    checkInButtonEnabled: boolean;
    statusLabel: string;
  }> {
    const currentDateTime = new Date();
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw new Error('Employee not found');
    }

    const today = currentDateTime.toISOString().split('T')[0];
    const attendanceRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_time: today,
        check_out_time: null,
      },
    });

    let checkInButtonEnabled = true;
    let statusLabel = 'Not checked in';

    if (attendanceRecord) {
      checkInButtonEnabled = false;
      statusLabel = 'Checked in';
    }

    // Assuming there is a method to update the system interface, otherwise, we would need to create one.
    await this.systemInterfaceRepository.save({
      current_date_time: currentDateTime,
      check_in_button_enabled: checkInButtonEnabled,
      status_label: statusLabel,
    });

    return {
      currentDateTime,
      employeeName: employee.name,
      employeeRole: employee.role,
      checkInButtonEnabled,
      statusLabel,
    };
  }
}