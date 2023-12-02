import { PostModel } from "@database/model/post.model";
import { Sequelize } from "sequelize-typescript";

class AppDatabase {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.startDB();
  }

  public async startDB() {
    this.sequelize = new Sequelize({
      dialect: "mysql",
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      models: [PostModel]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
        process.exit(1);
      });
  }

  public async closeDB() {
    await this.sequelize?.close();
  }
}

export default AppDatabase;
