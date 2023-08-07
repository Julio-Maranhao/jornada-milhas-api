import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDestinoProperties1691438906318 implements MigrationInterface {
  name = 'AddDestinoProperties1691438906318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "destinos" DROP COLUMN "foto"`);
    await queryRunner.query(
      `ALTER TABLE "destinos" ADD "foto_1" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "destinos" ADD "foto_2" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "destinos" ADD "meta" character varying(160)`,
    );
    await queryRunner.query(
      `ALTER TABLE "destinos" ADD "textoDescritivo" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "destinos" DROP COLUMN "textoDescritivo"`,
    );
    await queryRunner.query(`ALTER TABLE "destinos" DROP COLUMN "meta"`);
    await queryRunner.query(`ALTER TABLE "destinos" DROP COLUMN "foto_2"`);
    await queryRunner.query(`ALTER TABLE "destinos" DROP COLUMN "foto_1"`);
    await queryRunner.query(
      `ALTER TABLE "destinos" ADD "foto" character varying(255)`,
    );
  }
}
