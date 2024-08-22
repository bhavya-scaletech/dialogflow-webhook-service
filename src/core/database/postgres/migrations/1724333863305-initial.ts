import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724333863305 implements MigrationInterface {
    name = 'Initial1724333863305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "disease" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_f7a8573a47cdc044735eda4644b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicines" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "disease_id" integer NOT NULL, "dosage" character varying(255), "frequency" character varying(255), "available_quantity" integer, "rate_per_unit" numeric(10,2), "quantity_per_unit" integer, CONSTRAINT "PK_77b93851766f7ab93f71f44b18b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medicines" ADD CONSTRAINT "FK_93bde4d033c636c87a21b03e576" FOREIGN KEY ("disease_id") REFERENCES "disease"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicines" DROP CONSTRAINT "FK_93bde4d033c636c87a21b03e576"`);
        await queryRunner.query(`DROP TABLE "medicines"`);
        await queryRunner.query(`DROP TABLE "disease"`);
    }

}
