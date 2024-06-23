import InvitationService, { Invitation, Rsvp } from "./invitation";

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

type HttpGetInternalResponse = {
  invitations: InternalInvitation[];
};

type HttpPostInternalResponse = {
  data?: InternalInvitation | undefined;
  error: boolean;
  message?: string;
};

export default class InvitationServiceImpl implements InvitationService {
  async getInvitations() {
    const res = await fetch(`${apiConfig.url}`, {
      method: "GET",
    });
    const body = (await res.json()) as unknown as HttpGetInternalResponse;
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
    const body = (await res.json()) as unknown as HttpGetInternalResponse;
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
  async updateInvitationRsvp(id: string, rsvp: Rsvp) {
    const res = await fetch(`${apiConfig.url}`, {
      method: "POST",
      body: JSON.stringify({
        ...rsvp,
        id,
      }),
    });
    const body = (await res.json()) as unknown as HttpPostInternalResponse;
    if (body.error) {
      console.log(`Failed to updateInvitationRsvp: ${body.message}`);
      return undefined;
    }
    const { data } = body;
    if (!data) {
      return undefined;
    }
    return {
      created_at: data.created_at,
      name: data.name,
      id: data.id,
      invitation_pax: data.invitation_pax,
      rsvp: {
        will_attend: data.will_attend,
        num_attendee: data.num_attendee,
      },
    };
  }
}
