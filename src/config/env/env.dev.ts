import { cleanEnv, str } from "envalid";

const envDev = {
  MYSQL_HOST: str(),
  MYSQL_DATABASE: str(),
  MYSQL_USER: str(),
  MYSQL_PASSWORD: str(),
  MYSQL_PORT: str()
};

const envDevValidate = () => {
  cleanEnv(process.env, envDev);
};

export { envDevValidate };
