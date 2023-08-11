export type Response<T> = Ok<T> | Err;

type Ok<T> = {
  status: "ok";
  statusCode: number;
  data: T;
  timestamp: Date;
};

type Err = {
  status: "error";
  statusCode: number;
  message: string;
  timestamp: Date;
};
