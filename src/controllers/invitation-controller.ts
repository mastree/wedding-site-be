import { Request, Response } from "express";
import InvitationService, { Rsvp } from "../models/invitation";

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

  async getInvitations(req: Request, res: Response) {
    try {
      const data = await this.service.getInvitations();
      return res.send(createResponse({ data }));
    } catch (e) {
      res.status(500).send();
    }
  }

  async getInvitationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.service.getInvitationById(id);
      if (data) {
        return res.send(createResponse({ data }));
      }

      return res.status(404).send(
        createResponse({
          error: true,
          message: "No invitation with such id!",
        })
      );
    } catch (e) {
      res.status(500).send();
    }
  }

  async updateInvitationRsvp(req: Request, res: Response) {
    console.log(`id: ${req.params.id}, body: ${JSON.stringify(req.body)}`);
    const { id } = req.params;
    try {
      const rsvp = {
        will_attend: false,
        num_attendee: 0,
        ...req.body,
      } as unknown as Rsvp;
      if (!rsvp.will_attend) {
        rsvp.num_attendee = 0;
      }
      const data = await this.service.updateInvitationRsvp(id, rsvp);
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
}
