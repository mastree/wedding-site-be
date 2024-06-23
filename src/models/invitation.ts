export type Rsvp = {
  will_attend: boolean | undefined;
  num_attendee: number | undefined;
};

export type Invitation = {
  created_at: number;
  name: string;
  id: string;
  invitation_pax: number;
  rsvp?: Rsvp;
};

export default interface InvitationService {
  getInvitations(): Promise<Invitation[]>;
  getInvitationById(id: string): Promise<Invitation | undefined>;
  updateInvitationRsvp(id: string, rsvp: Rsvp): Promise<Invitation | undefined>;
}
