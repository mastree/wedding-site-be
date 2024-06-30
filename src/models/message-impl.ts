import MessageService, { HttpGetRangeResponse, Message } from "./message";

const apiConfig = {
  url: process.env.API_URL || "",
};

type HttpGetInternalResponse = {
  messages: Message[];
};
type HttpGetDataSizeResponse = {
  dataSize: number;
};

type HttpPostInternalResponse = {
  data?: Message | undefined;
  error: boolean;
  message?: string;
};

export class MessageServiceImpl implements MessageService {
  async getAll() {
    const res = await fetch(`${apiConfig.url}?doMessage`, {
      method: "GET",
    });
    const body = (await res.json()) as unknown as HttpGetInternalResponse;
    return body.messages;
  }
  async getPage(page: number, pageSize: number) {
    const res = await fetch(
      `${apiConfig.url}?doMessage&page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
      }
    );
    const body = (await res.json()) as unknown as HttpGetInternalResponse;
    return body.messages;
  }
  async getRange(offset: number, rangeSize: number) {
    const res = await fetch(
      `${apiConfig.url}?doMessage&offset=${offset}&rangeSize=${rangeSize}`,
      {
        method: "GET",
      }
    );
    const body = (await res.json()) as unknown as HttpGetRangeResponse;
    return body;
  }
  async add(message: Message): Promise<Message | undefined> {
    const res = await fetch(`${apiConfig.url}?doMessage`, {
      method: "POST",
      body: JSON.stringify(message),
    });
    const body = (await res.json()) as unknown as HttpPostInternalResponse;
    if (body.error) {
      console.log(`Failed to add message: ${body.message}`);
      return undefined;
    }
    const { data } = body;
    if (!data) {
      return undefined;
    }
    return data;
  }
  async getSize() {
    const res = await fetch(`${apiConfig.url}?doMessage&queryLength`, {
      method: "GET",
    });
    const body = (await res.json()) as unknown as HttpGetDataSizeResponse;
    return body.dataSize;
  }
}
