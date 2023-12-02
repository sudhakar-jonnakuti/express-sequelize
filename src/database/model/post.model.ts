import "reflect-metadata";

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "Post"
})
class PostModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  public id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "title"
  })
  title!: string;

  @Column({
    type: DataType.STRING(255),
    field: "author"
  })
  public author!: string;

  @Column({
    type: DataType.STRING(255),
    field: "content"
  })
  public content!: string;
}

export { PostModel };
