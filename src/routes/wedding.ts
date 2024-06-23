import { Request, Response, Router } from "express";
import InvitationServiceDummyImpl from "../models/invitation-dummy";
import InvitationServiceImpl from "../models/invitation-impl";
import InvitationController from "../controllers/invitation-controller";

const router = Router();
// const invitationService = new InvitationServiceDummyImpl();
const invitationService = new InvitationServiceImpl();
const invitationController = new InvitationController(invitationService);

// wedding/invitations
router.get("/invitations", (req: Request, res: Response) =>
  invitationController.getInvitations(req, res)
);

// wedding/invitation/:id
router.get("/invitation/:id", (req: Request, res: Response) =>
  invitationController.getInvitationById(req, res)
);

router.post("/invitation/:id", (req: Request, res: Response) =>
  invitationController.updateInvitationRsvp(req, res)
);

export default router;
