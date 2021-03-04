import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDev1614888470713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'github_username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'bio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'posts',
            type: 'integer',
            default: 0,
          },
          {
            name: 'connected_devs',
            type: 'uuid',
            isNullable: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      'devs',
      new TableForeignKey({
        name: 'Connections',
        columnNames: ['connected_devs'],
        referencedColumnNames: ['id'],
        referencedTableName: 'devs',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('devs', 'Connections');
    await queryRunner.dropTable('devs');
  }
}
