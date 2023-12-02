import { PostModel } from "@database/model/post.model";

interface IPostService {
  save(post: PostModel): Promise<PostModel>;
  retrieveAll(searchParams: { title: string }): Promise<PostModel[]>;
  retrieveById(postId: number): Promise<PostModel | null>;
  update(post: PostModel): Promise<number>;
  delete(postId: number): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

export { IPostService, SearchCondition };
