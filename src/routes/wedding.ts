import { Request, Response, Router } from "express";
import InvitationServiceDummyImpl from "../models/invitation-dummy";
import InvitationController from "../controllers/invitation-controller";

const router = Router();
const invitationService = new InvitationServiceDummyImpl();
const invitationController = new InvitationController(invitationService);

// wedding/invitations
router.get("/invitations", (req: Request, res: Response) =>
  invitationController.getInvitations(req, res)
);

// wedding/invitation/:id
router.get("/invitation/:id", (req: Request, res: Response) =>
  invitationController.getInvitationById(req, res)
);

export default router;
