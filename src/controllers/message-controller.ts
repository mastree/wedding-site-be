import { Request, Response } from "express";
import { createResponse } from "./common";
import MessageService, { Message } from "../models/message";

const kMaxNameCharacters = 40;
const kMaxMessageCharacters = 400;

type GetPageQuery = {
  page: number;
  pageSize?: number;
};
type GetRangeQuery = {
  offset: number;
  rangeSize: number;
};

export default class MessageController {
  service: MessageService;

  constructor(service: MessageService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAll();
      return res.send(createResponse({ data }));
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }

  async getPage(req: Request, res: Response) {
    if (!("page" in req.query)) return this.getAll(req, res);
    try {
      const { page = 0, pageSize = 5 } = req.query as unknown as GetPageQuery;
      const data = await this.service.getPage(page, pageSize);
      return res.send(createResponse({ data }));
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }

  async getRange(req: Request, res: Response) {
    if (!("offset" in req.query)) return this.getAll(req, res);
    try {
      const { offset = 0, rangeSize = 10 } =
        req.query as unknown as GetRangeQuery;
      const data = await this.service.getRange(offset, rangeSize);
      return res.send(createResponse({ data }));
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }

  async add(req: Request, res: Response) {
    try {
      let message = {
        ...req.body,
      } as unknown as Message;
      if (message.name.length == 0) {
        message.name = "Anonymous";
      }
      const trimmed = {
        name: message.name.substring(0, kMaxNameCharacters),
        message: message.message.substring(0, kMaxMessageCharacters),
      };
      const data = await this.service.add(message);
      if (data) {
        return res.send(createResponse({ data }));
      }
      return res.status(500).send(
        createResponse({
          error: true,
          message: "Internal server error!",
        })
      );
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }

  async getSize(req: Request, res: Response) {
    try {
      const data = await this.service.getSize();
      return res.send(createResponse({ data }));
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
}
