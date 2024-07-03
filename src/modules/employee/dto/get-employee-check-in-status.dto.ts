import { IsInt } from 'class-validator';

export class GetEmployeeCheckInStatusDto {
  @IsInt()
  employeeId: number;
}