import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { RecordEmployeeCheckInDto } from './dto/record-employee-check-in.dto';
import { AttendanceService } from './attendance.service';

@ApiTags('Attendance')
@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/check-in')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async recordCheckIn(@Body() recordEmployeeCheckInDto: RecordEmployeeCheckInDto) {
    try {
      const { employeeId } = recordEmployeeCheckInDto;
      const checkInTime = new Date(); // Assuming we record the current time as check-in time
      const result = await this.attendanceService.recordEmployeeCheckIn(employeeId, checkInTime);

      return {
        status: HttpStatus.OK,
        message: result.message,
        check_in_time: result.checkInTime,
      };
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'An unexpected error has occurred on the server.';

      if (error.status === HttpStatus.NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
        message = error.response;
      } else if (error.status === HttpStatus.BAD_REQUEST) {
        status = HttpStatus.CONFLICT;
        message = error.response;
      }

      return {
        status,
        message,
      };
    }
  }
}