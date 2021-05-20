import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMovies1621532193971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'director',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('movies');
    }

}
