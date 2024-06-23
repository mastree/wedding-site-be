export type Message = {
  name: string;
  message: string;
  created_at?: number;
};

export default interface MessageService {
  getAll(): Promise<Message[]>;
  getPage(page: number, pageSize: number): Promise<Message[]>;
  add(message: Message): Promise<Message | undefined>;
}
