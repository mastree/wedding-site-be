import { Request, Response } from "express";
import InvitationService from "../models/invitation";

export type ControllerResponse = {
  data: any;
  error: boolean;
  message: string;
};

const createResponse = ({
  data = undefined,
  error = false,
  message = "",
}: any): ControllerResponse => {
  return { data, error, message };
};

export default class InvitationController {
  service: InvitationService;

  constructor(service: InvitationService) {
    this.service = service;
  }

  getInvitations(req: Request, res: Response) {
    const data = this.service.getInvitations();
    return res.send(createResponse({ data }));
  }

  getInvitationById(req: Request, res: Response) {
    const { id } = req.params;
    const data = this.service.getInvitationById(id);
    if (data) {
      return res.send(createResponse({ data }));
    }

    return res.status(404).send(
      createResponse({
        error: true,
        message: "no invitation with such id!",
      })
    );
  }
}
