import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDepoimentos1690587102103 implements MigrationInterface {
  name = 'CreateDepoimentos1690587102103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "depoimentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "foto" character varying(255) NOT NULL, "depoimento" character varying(255) NOT NULL, "username" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_08e657419a25376f0c54a5a506a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "depoimentos"`);
  }
}
