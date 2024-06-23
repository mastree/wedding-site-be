export type ControllerResponse = {
  data: any;
  error: boolean;
  message: string;
};

export const createResponse = ({
  data = undefined,
  error = false,
  message = "",
}: any): ControllerResponse => {
  return { data, error, message };
};
