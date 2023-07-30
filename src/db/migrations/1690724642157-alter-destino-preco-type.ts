import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDestinoPrecoType1690724642157 implements MigrationInterface {
    name = 'AlterDestinoPrecoType1690724642157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destinos" DROP COLUMN "preco"`);
        await queryRunner.query(`ALTER TABLE "destinos" ADD "preco" real NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destinos" DROP COLUMN "preco"`);
        await queryRunner.query(`ALTER TABLE "destinos" ADD "preco" integer NOT NULL`);
    }

}
