import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class TagsMigration1577109695993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp without time zone'
          },
          {
            name: 'updatedAt',
            type: 'timestamp without time zone'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('tags')
  }
}
