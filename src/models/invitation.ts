export type Rsvp = {
  will_attend: boolean;
  num_attendee: number;
};

export type Invitation = {
  created_at: number;
  name: string;
  id: string;
  invitation_pax: number;
  rsvp?: Rsvp;
};

export default interface InvitationService {
  getInvitations(): Invitation[];
  getInvitationById(id: string): Invitation | undefined;
}
