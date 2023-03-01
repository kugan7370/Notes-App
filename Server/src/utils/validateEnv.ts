//validate env
import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  Mongo_Connect: str(),
  PORT: port(),
  JWT_SECRET: str(),
  JWT_SECRET_EXPIRES_IN: str(),
  JWT_COOKIE_EXPIRE: str(),
});
