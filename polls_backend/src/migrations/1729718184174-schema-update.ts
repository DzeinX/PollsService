import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1729718184174 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "users" ("id", "username", "password", "isAdmin") VALUES (1, 'test', 'test', false)`);
        await queryRunner.query(`INSERT INTO "users" ("id", "username", "password", "isAdmin") VALUES (2, 'admin', 'admin', true)`);

        const date: string = this.formatDateToString(new Date());
        await queryRunner.query(`INSERT INTO "polls" ("id", "title", "comment", "dateCreated") VALUES (1, 'Как вы предпочитаете проводить свободное время?', '', '${date}')`);
        await queryRunner.query(`INSERT INTO "polls" ("id", "title", "comment", "dateCreated") VALUES (2, 'Какую кухню вы любите больше всего?', '', '${date}')`);
        await queryRunner.query(`INSERT INTO "polls" ("id", "title", "comment", "dateCreated") VALUES (3, 'Какие социальные сети вы используете чаще всего?', '', '${date}')`);

        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (1, 'Чтение книг', 0, 1)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (2, 'Спорт и активный отдых', 0, 1)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (3, 'Просмотр фильмов или сериалов', 0, 1)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (4, 'Путешествия', 0, 1)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (5, 'Встречи с друзьями', 0, 1)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (6, 'Итальянская', 0, 2)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (7, 'Японская', 0, 2)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (8, 'Мексиканская', 0, 2)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (9, 'Французская', 0, 2)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (10, 'Русская', 0, 2)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (11, 'TikTok', 0, 3)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (12, 'ВКонтакте', 0, 3)`);
        await queryRunner.query(`INSERT INTO "answers" ("id", "answer", "votes", "pollId") VALUES (13, 'Другие', 0, 3)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private formatDateToString(date: Date): string {
        const pad = (num: number) => String(num).padStart(2, '0'); // Добавляет нули перед числами < 10

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Месяцы начинаются с 0
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const milliseconds = String(date.getMilliseconds()).padEnd(6, '0'); // Задаем 6 цифр

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

}
