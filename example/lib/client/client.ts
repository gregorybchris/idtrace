import { ClientBase } from "./client-base";
import {
  DeleteVidResponse,
  GetItemVidsResponse,
  GetUserVidsResponse,
  GetVidResponse,
  GetVidsResponse,
  PostVidRequest,
  PostVidResponse,
} from "./client-routes";

export class Client extends ClientBase {
  constructor() {
    super();
  }

  async postVid(userId: string, itemId: string): Promise<PostVidResponse> {
    const requestBody: PostVidRequest = {};
    return await this.post(`/user/${userId}/item/${itemId}/vid`, requestBody);
  }

  async getVid(userId: string, itemId: string): Promise<GetVidResponse> {
    return await this.get(`/user/${userId}/item/${itemId}/vid`);
  }

  async deleteVid(userId: string, itemId: string): Promise<DeleteVidResponse> {
    return await this.delete(`/user/${userId}/item/${itemId}/vid`);
  }

  async getAllVids(): Promise<GetVidsResponse> {
    return await this.get(`/vids`);
  }

  async getVids(userId: string, itemId: string): Promise<GetVidsResponse> {
    return await this.get(`/user/${userId}/item/${itemId}/vids`);
  }

  async getUserVids(userId: string): Promise<GetUserVidsResponse> {
    return await this.get(`/user/${userId}/vids`);
  }

  async getItemVids(itemId: string): Promise<GetItemVidsResponse> {
    return await this.get(`/item/${itemId}/vids`);
  }
}
