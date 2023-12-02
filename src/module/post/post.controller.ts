import SuccessResponse from "@common/builder/success-response.builder";
import { PostModel } from "@database/model/post.model";
import { BadRequest } from "@exception/response/client.exception";
import { InternalServeError } from "@exception/response/server.exception";
import PostService from "@module/post/post.service";
import { Request, Response } from "express";

class PostController {
  public createPost = async (request: Request, response: Response) => {
    const postInput: PostModel = request.body;

    try {
      const createdPost = await PostService.save(postInput);
      response.status(200).json(SuccessResponse(200, createdPost));
    } catch (error) {
      console.log("Failed to create Post");
      throw new InternalServeError(error);
    }
  };

  public getPosts = async (request: Request, response: Response) => {
    const title = typeof request.params.title === "string" ? request.params.title : "";

    try {
      const posts = await PostService.retrieveAll({ title });
      response.status(200).json(SuccessResponse(200, posts));
    } catch (error) {
      console.log("Failed to retrieve Post!");
      throw new InternalServeError(error);
    }
  };

  public async getPostById(request: Request, response: Response) {
    const id: number = Number(request.params.id);

    try {
      const post = await PostService.retrieveById(id);

      if (!post) {
        throw new BadRequest(`The post with the id "${id}" not found.`);
      }

      response.status(200).json(SuccessResponse(200, post));
    } catch (error) {
      console.log("Failed to retrieve Post!");
      throw new InternalServeError(error);
    }
  }

  public async updatePost(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const postInput: PostModel = request.body;
    postInput.id = id;

    try {
      const post = await PostService.update(postInput);

      if (!post) {
        throw new BadRequest(`The post with the id "${id}" not found.`);
      }

      response.status(200).json(SuccessResponse(200, post));
    } catch (error) {
      console.log("Failed to update Post!");
      throw new InternalServeError(error);
    }
  }

  public async deletePost(request: Request, response: Response) {
    const id = Number(request.params.id);

    try {
      const post = await PostService.delete(id);

      if (!post) {
        throw new BadRequest(`The post with the id "${id}" not found.`);
      }

      response.status(200).json(SuccessResponse(200, post));
    } catch (error) {
      console.log("Failed to delete Post!");
      throw new InternalServeError(error);
    }
  }
}

export default PostController;
