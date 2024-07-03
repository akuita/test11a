import { IsNumber, IsDate } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsNumber()
  employeeId: number;

  @IsDate()
  checkInTime: Date;
}