import { Request, Response, Router } from "express";
import InvitationServiceDummyImpl from "../models/invitation-dummy";
import InvitationServiceImpl from "../models/invitation-impl";
import InvitationController from "../controllers/invitation-controller";
import { MessageServiceImpl } from "../models/message-impl";
import MessageController from "../controllers/message-controller";
import PdfGeneratorController from "../controllers/pdf-generator";

const router = Router();
// const invitationService = new InvitationServiceDummyImpl();
const invitationService = new InvitationServiceImpl();
const invitationController = new InvitationController(invitationService);
const pdfGeneratorController = new PdfGeneratorController();

const messageService = new MessageServiceImpl();
const messageController = new MessageController(messageService);

// wedding/invitation/pdf
router.post("/invitation/pdf", (req: Request, res: Response) =>
  pdfGeneratorController.generatePdfWithText(req, res)
);
// wedding/invitation/:id
router.get("/invitation/:id", (req: Request, res: Response) =>
  invitationController.getById(req, res)
);
router.post("/invitation/:id", (req: Request, res: Response) =>
  invitationController.updateRsvp(req, res)
);
// wedding/invitations
router.get("/invitations", (req: Request, res: Response) =>
  invitationController.getAll(req, res)
);

// wedding/message/size
router.get("/message/size", (req: Request, res: Response) =>
  messageController.getSize(req, res)
);
// wedding/message
// wedding/message?page=<p>&pageSize=<ps>
router.get("/message", (req: Request, res: Response) =>
  messageController.getPage(req, res)
);
// wedding/message/range?offset=<o>&rangeSize=<rs>
router.get("/message/range", (req: Request, res: Response) =>
  messageController.getRange(req, res)
);
router.post("/message", (req: Request, res: Response) =>
  messageController.add(req, res)
);

export default router;
