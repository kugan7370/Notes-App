export interface ErrorStatus extends Error {
  status?: number;
  message: string;
}

//create error handler
export const createError = (status: number, message: string) => {
  const err: ErrorStatus = new Error();
  err.status = status;
  err.message = message;
  return err;
};
