import { IsNumber } from 'class-validator';

export class RecordEmployeeCheckInDto { // Removed unnecessary checkInTime property and updated employeeId to employee_id
  @IsNumber()
  employee_id: number;
}