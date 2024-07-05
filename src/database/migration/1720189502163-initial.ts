import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1120189502163 implements MigrationInterface {
    name = 'initial1120189502163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_d9a5496b4beacb54f5cafd25e7d" UNIQUE ("code"), CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "slot_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_070e0048d3ac946ca376ce4a090" UNIQUE ("name"), CONSTRAINT "PK_36c811004fa922e7d148679a0f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booked_slot_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mobileNumber" character varying NOT NULL, "area_id" integer NOT NULL, "slot_id" integer NOT NULL, "product_id" integer NOT NULL, "archived" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9ba2d3f6c84b5713a05f11db702" UNIQUE ("mobileNumber"), CONSTRAINT "PK_d774213492fddb422c6cf8f49be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8e62d8e905b3e54a2eb2c573be" ON "booked_slot_entity" ("mobileNumber") WHERE archived = false`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3938ddc25d067582563f5a1285" ON "booked_slot_entity" ("product_id", "slot_id") WHERE archived = false`);
        await queryRunner.query(`CREATE TABLE "area_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_07a8dccb1b6145d45ecdb32fcb6" UNIQUE ("name"), CONSTRAINT "PK_8deebab66e51e4202d08d6bac77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "CHK_587ac318c5e5b604a6e99c8c18" CHECK (lower("username") = "username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booked_slot_entity" ADD CONSTRAINT "FK_eb82929c6f963de2e3e8c980acc" FOREIGN KEY ("area_id") REFERENCES "area_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booked_slot_entity" ADD CONSTRAINT "FK_eea8ef6ccf7631dd3659c1cf482" FOREIGN KEY ("slot_id") REFERENCES "slot_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booked_slot_entity" ADD CONSTRAINT "FK_10735e1efac0a7b2b04e8db2e36" FOREIGN KEY ("product_id") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booked_slot_entity" DROP CONSTRAINT "FK_10735e1efac0a7b2b04e8db2e36"`);
        await queryRunner.query(`ALTER TABLE "booked_slot_entity" DROP CONSTRAINT "FK_eea8ef6ccf7631dd3659c1cf482"`);
        await queryRunner.query(`ALTER TABLE "booked_slot_entity" DROP CONSTRAINT "FK_eb82929c6f963de2e3e8c980acc"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "area_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_3938ddc25d067582563f5a1285"`);
        await queryRunner.query(`DROP INDEX "IDX_8e62d8e905b3e54a2eb2c573be"`);
        await queryRunner.query(`DROP TABLE "booked_slot_entity"`);
        await queryRunner.query(`DROP TABLE "slot_entity"`);
        await queryRunner.query(`DROP TABLE "product_entity"`);
    }

}
