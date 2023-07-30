import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDestinos1690723008242 implements MigrationInterface {
    name = 'CreateDestinos1690723008242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "destinos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "foto" character varying(255) NOT NULL, "nome" character varying(100) NOT NULL, "preco" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_fe061def2dc841ace422db14ca2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "destinos"`);
    }

}
