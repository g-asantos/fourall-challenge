import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterMovieToAddRentedColumn1621550289722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'movies',
        new TableColumn({
            name: 'rented',
            type: 'boolean',
        }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('movies', 'rented');
    }

}
