import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePost1614891219698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'author_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'likes',
            type: 'integer',
            default: 0,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'Author',
        columnNames: ['author_id'],
        referencedTableName: 'devs',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'Author');

    await queryRunner.dropTable('posts');
  }
}
