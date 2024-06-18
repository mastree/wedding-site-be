import InvitationService, { Invitation } from "./invitation";

const invitations = [
  {
    created_at: 12312412,
    name: "John Doe",
    id: "xasAc12E",
    invitation_pax: 2,
    rsvp: {
      will_attend: true,
      num_attendee: 1,
    },
  },
  {
    created_at: 12362412,
    name: "King Kong",
    id: "“j1ljW1ks0”",
    invitation_pax: 1,
  },
];

export default class InvitationServiceDummyImpl implements InvitationService {
  getInvitations(): Invitation[] {
    return invitations;
  }
  getInvitationById(id: string): Invitation | undefined {
    return invitations.find((value) => {
      return value.id == id;
    });
  }
}
