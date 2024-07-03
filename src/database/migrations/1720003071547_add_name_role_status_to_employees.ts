import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addNameRoleStatusToEmployees1720003071547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('employees', [
            new TableColumn({
                name: 'name',
                type: 'varchar',
                isNullable: false
            }),
            new TableColumn({
                name: 'role',
                type: 'varchar',
                isNullable: false
            }),
            new TableColumn({
                name: 'status',
                type: 'enum',
                enum: ['active', 'inactive'],
                default: `'active'`
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('employees', 'status');
        await queryRunner.dropColumn('employees', 'role');
        await queryRunner.dropColumn('employees', 'name');
    }

}