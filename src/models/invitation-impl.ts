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

const apiConfig = {
  url: process.env.API_URL || "",
};

type InternalInvitation = {
  created_at: number;
  name: string;
  id: string;
  invitation_pax: number;
  will_attend?: boolean;
  num_attendee?: number;
};

type InternalResponse = {
  invitations: InternalInvitation[];
};

export default class InvitationServiceImpl implements InvitationService {
  async getInvitations() {
    const res = await fetch(apiConfig.url, {
      method: "GET",
    });
    const body = (await res.json()) as unknown as InternalResponse;
    console.log(`body: ${JSON.stringify(body)}`);
    return body.invitations.map((value): Invitation => {
      return {
        created_at: value.created_at,
        name: value.name,
        id: value.id,
        invitation_pax: value.invitation_pax,
        rsvp: {
          will_attend: value.will_attend,
          num_attendee: value.num_attendee,
        },
      };
    });
  }
  async getInvitationById(id: string) {
    const res = await fetch(`${apiConfig.url}?id=${id}`, {
      method: "GET",
    });
    const body = (await res.json()) as unknown as InternalResponse;
    console.log(`body: ${JSON.stringify(body)}`);
    return body.invitations.map((value): Invitation => {
      return {
        created_at: value.created_at,
        name: value.name,
        id: value.id,
        invitation_pax: value.invitation_pax,
        rsvp: {
          will_attend: value.will_attend,
          num_attendee: value.num_attendee,
        },
      };
    })[0];
  }
}
