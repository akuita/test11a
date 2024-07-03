import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCheckInOutToAttendanceRecords1720003071547 implements MigrationInterface {
    name = 'addCheckInOutToAttendanceRecords1720003071547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_records" ADD "check_in_time" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "attendance_records" ADD "check_out_time" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_records" DROP COLUMN "check_in_time"`);
        await queryRunner.query(`ALTER TABLE "attendance_records" DROP COLUMN "check_out_time"`);
    }
}