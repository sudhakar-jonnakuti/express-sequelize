import { PostModel } from "@database/model/post.model";
import { IPostService, SearchCondition } from "@module/post/post.interface";
import { Op } from "sequelize";

class PostService implements IPostService {
  async save(post: PostModel): Promise<PostModel> {
    return await PostModel.create({
      title: post.title,
      author: post.author,
      content: post.content
    });
  }

  async retrieveAll(searchParams: { title?: string }): Promise<PostModel[]> {
    const condition: SearchCondition = {};
    if (searchParams?.title) condition.title = { [Op.like]: `%${searchParams.title}%` };

    return await PostModel.findAll({
      where: condition
    });
  }

  async retrieveById(postId: number): Promise<PostModel | null> {
    return await PostModel.findByPk(postId);
  }

  async update(post: PostModel): Promise<number> {
    const { id, title, author, content } = post;
    const affectedRows = await PostModel.update({ title, author, content }, { where: { id: id } });
    return affectedRows[0];
  }

  async delete(postId: number): Promise<number> {
    const affectedRows = await PostModel.destroy({ where: { id: postId } });
    return affectedRows;
  }
}

export default new PostService();
