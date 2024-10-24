import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1729717889873 implements MigrationInterface {
    name = 'SchemaUpdate1729717889873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "polls" ALTER COLUMN "dateCreated" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "polls" ALTER COLUMN "dateCreated" SET DEFAULT '2024-10-23 21:00:47.35'`);
    }

}
