export type Message = {
  id: number;
  name: string;
  message: string;
  created_at?: number;
};
export type HttpGetRangeResponse = {
  data: Message[];
  offset: number;
  totalSize: number;
};

export default interface MessageService {
  getAll(): Promise<Message[]>;
  getPage(page: number, pageSize: number): Promise<Message[]>;
  getRange(offset: number, rangeSize: number): Promise<HttpGetRangeResponse>;
  add(message: Message): Promise<Message | undefined>;
  getSize(): Promise<number>;
}
