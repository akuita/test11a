import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { GetEmployeeCheckInStatusDto } from './dto/get-employee-check-in-status.dto';
import { Auth } from '../../decorators/auth.decorator';

@Controller('/api/attendance')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/check-in/status')
  @Auth()
  async getCheckInStatus(@Query() query: GetEmployeeCheckInStatusDto) {
    try {
      const status = await this.employeeService.getEmployeeCheckInStatus(query.employeeId);
      return {
        status: HttpStatus.OK,
        current_date_time: status.currentDateTime.toISOString(),
        employee: {
          name: status.employeeName,
          role: status.employeeRole,
        },
        check_in_button_enabled: status.checkInButtonEnabled,
        status_label: status.statusLabel,
      };
    } catch (error) {
      if (error.message === 'Employee not found') {
        throw new HttpException('Employee not found', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}