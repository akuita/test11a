import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSystemInterfacesTable1720003071547 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'system_interfaces',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'branding',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'navigation_links',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'current_date_time',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'check_in_button_enabled',
                    type: 'boolean',
                    isNullable: false,
                },
                {
                    name: 'status_label',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('system_interfaces');
    }
}